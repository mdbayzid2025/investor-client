'use client'
import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Building, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../button';
import { useSignupMutation } from '@/redux/slice/authApi';
import { toast } from 'sonner';
import Cookies from 'js-cookie';


export function SignupForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    // Agent fields
    agencyDetails: '',
    ffcNumber: '',
    // Investor fields
    investorType: '',
    investmentBudget: '',   // ✅ Fixed: was 'investmentAmount', schema uses 'investmentBudget'
    location: '',
    // Developer fields
    companyName: '',
    // Terms
    termsAndConditions: false,  // ✅ Added: schema has termsAndConditions field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [signup] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    // Validate role selection
    if (!formData.role) {
      setError('Please select your role');
      setIsLoading(false);
      return;
    }

    // Validate role-specific required fields
    if (formData.role === 'AGENT') {
      if (!formData.agencyDetails || !formData.ffcNumber) {
        setError('Please fill in all agent details');
        setIsLoading(false);
        return;
      }
    }

    if (formData.role === 'INVESTOR') {
      if (!formData.investorType || !formData.investmentBudget || !formData.location) {
        setError('Please fill in all investor details');
        setIsLoading(false);
        return;
      }
    }

    if (formData.role === 'DEVELOPER') {
      if (!formData.companyName) {
        setError('Please provide your company name');
        setIsLoading(false);
        return;
      }
    }

    try {
      // Build payload matching the schema exactly
      // ✅ Strip confirmPassword (not in schema), send termsAndConditions as boolean
      const { confirmPassword, ...rest } = formData;

      const payload: Record<string, any> = {
        name: rest.name,
        email: rest.email,
        phone: rest.phone,
        password: rest.password,
        role: rest.role,
        termsAndConditions: rest.termsAndConditions,  // ✅ boolean sent to backend
      };

      // Role-specific fields — only include what's relevant
      if (rest.role === 'AGENT') {
        payload.agencyDetails = rest.agencyDetails;
        payload.ffcNumber = rest.ffcNumber;
      }

      if (rest.role === 'INVESTOR') {
        payload.investorType = rest.investorType;
        payload.investmentBudget = Number(rest.investmentBudget); // ✅ schema type is Number
        payload.location = rest.location;
      }

      if (rest.role === 'DEVELOPER') {
        payload.companyName = rest.companyName;
      }

      // TODO: Replace with your actual API call
      const response = await signup(payload)?.unwrap();

      if (response.success) {
        toast.success("We’ve sent an OTP to your email. Please verify your account using the OTP.")
        setIsLoading(false)
        router.replace('/otp-verify');
        Cookies.set("verify-email", payload?.email)
      }
    } catch (err: any) {
      toast.error(err?.data?.message)
      setIsLoading(false)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      // ✅ Handle checkbox as boolean
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">Join Investors Hub</h1>
          <p className="text-gray-400">Create your account and start investing</p>
        </div>

        <div className="bg-[#111111] md:min-w-xl p-8 rounded-xl border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">


              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="+27 82 123 4567"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Minimum 8 characters"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="INVESTOR">Investor</option>
                    <option value="AGENT">Agent</option>
                    <option value="DEVELOPER">Developer</option>
                    <option value="SELLER">Seller</option>
                  </select>
                </div>
                <p className="mt-1.5 text-xs text-gray-500">Helps us personalize your experience</p>
              </div>

              {/* Conditional Fields */}
              {formData.role && (
                <div className="md:grid md:grid-cols-2 md:col-span-2  gap-4 pt-4 border-t border-primary/10 space-y-5 animate-fadeIn">

                  {/* Agent Fields */}
                  {formData.role === 'AGENT' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Agency Details</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="agencyDetails"
                            value={formData.agencyDetails}
                            onChange={handleChange}
                            className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g. ABC Realty, Sandton Branch"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">FFC Number</label>
                        <input
                          type="text"
                          name="ffcNumber"
                          value={formData.ffcNumber}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                          placeholder="FFC-123456"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Investor Fields */}
                  {formData.role === 'INVESTOR' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Investor Type</label>
                        <select
                          name="investorType"
                          value={formData.investorType}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="private">Private Investor</option>
                          <option value="institutional">Institutional Investor</option>
                        </select>
                        <p className="mt-1.5 text-xs text-gray-500">This information helps us match opportunities</p>
                      </div>

                      <div>
                        {/* ✅ Fixed label and field name: investmentBudget (was investmentAmount) */}
                        <label className="block text-sm font-medium text-gray-300 mb-2">Investment Budget</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="number"
                            name="investmentBudget"
                            value={formData.investmentBudget}
                            onChange={handleChange}
                            className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g. 500000"
                            min="0"
                            step="10000"
                            required
                          />
                        </div>
                      </div>

                      <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                            required
                          >
                            <option value="">Select location</option>
                            <option value="south-africa">South Africa</option>
                            <option value="international">International</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Developer Fields */}
                  {formData.role === 'DEVELOPER' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                          placeholder="e.g. XYZ Developments (Pty) Ltd"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ✅ Fixed: termsAndConditions handled as boolean via handleChange */}
              <div className="text-xs text-gray-400 pt-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="termsAndConditions"
                    checked={formData.termsAndConditions}
                    onChange={handleChange}
                    className="mr-2 mt-1 accent-primary"
                    required
                  />
                  <span>
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:text-[#E4C77D]">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:text-[#E4C77D]">Privacy Policy</Link>
                  </span>
                </label>
              </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <p className="text-xs text-center text-gray-500">
                All information is handled confidentially.
              </p>

              {error && (
                <div className="mt-2 text-sm text-red-500">
                  {error}
                </div>
              )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-[#E4C77D] font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}