'use client'
import React, { useState } from 'react';


import { User, Mail, Lock, Phone, Building, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../button';

export function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    investmentAmount: '',
    location: '',
    // Developer fields
    companyName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
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
    try {              
      // Mock successful registration
      console.log('Sign up successful:', { 
        name: `${formData.firstName} ${formData.lastName}`, 
        email: formData.email,
        phone: formData.phone,
        role: formData.role
      });
      
      // Redirect to dashboard after successful signup
      router.replace('/login');
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="">
      <div className="w-full">
        <div className="text-center mb-8">
          {/* <Logo className="justify-center mb-8" /> */}
          <h1 className="text-4xl font-serif text-white mb-2">Join Investors Hub</h1>
          <p className="text-gray-400">Create your account and start investing</p>
        </div>
        
        <div className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields - Split for better UX */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="+27 82 123 4567"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                I am a
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="investor">Investor</option>
                  <option value="agent">Agent</option>
                  <option value="developer">Developer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <p className="mt-1.5 text-xs text-gray-500">Helps us personalize your experience</p>
            </div>

            {/* Conditional Fields with smooth transition */}
            {formData.role && (
              <div className="pt-4 border-t border-[#D4AF37]/10 space-y-5 animate-fadeIn">
                {/* Agent Conditional Fields */}
                {formData.role === 'agent' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Agency Details
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="agencyDetails"
                          value={formData.agencyDetails}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="e.g. ABC Realty, Sandton Branch"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        FFC Number
                      </label>
                      <input
                        type="text"
                        name="ffcNumber"
                        value={formData.ffcNumber}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        placeholder="FFC-123456"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Investor Conditional Fields */}
                {formData.role === 'investor' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Investor Type
                      </label>
                      <select
                        name="investorType"
                        value={formData.investorType}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      >
                        <option value="">Select type</option>
                        <option value="private">Private Investor</option>
                        <option value="institutional">Institutional Investor</option>
                      </select>
                      <p className="mt-1.5 text-xs text-gray-500">This information helps us match opportunities</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Investment Budget
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="number"
                          name="investmentAmount"
                          value={formData.investmentAmount}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="e.g. 500000"
                          min="0"
                          step="10000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
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

                {/* Developer Conditional Fields */}
                {formData.role === 'developer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        placeholder="e.g. XYZ Developments (Pty) Ltd"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="text-xs text-gray-400 pt-2">
              <label className="flex items-start">
                <input type="checkbox" className="mr-2 mt-1 accent-[#D4AF37]" required />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#D4AF37] hover:text-[#E4C77D]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#D4AF37] hover:text-[#E4C77D]">
                    Privacy Policy
                  </Link>
                </span>
              </label>
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
            <Link href="/login" className="text-[#D4AF37] hover:text-[#E4C77D] font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}