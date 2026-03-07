import React, { useState } from 'react';

import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../button';

export function ChangePasswordConfirm() {
  
    const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Validate current password is entered
    if (!formData.currentPassword) {
      setError('Please enter your current password');
      setIsLoading(false);
      return;
    }
    
    // Validate new passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Validate password strength
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    
    // Check if new password is different from current
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      setIsLoading(false);
      return;
    }
    
    try {
      // TODO: Replace with actual password change API call
      // const response = await fetch('/api/auth/change-password', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify({ 
      //     currentPassword: formData.currentPassword,
      //     newPassword: formData.newPassword 
      //   })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
            
      setIsSuccess(true);
      
      // Redirect to settings after 3 seconds
      setTimeout(() => {
        router.replace('/');
      }, 3000);
    } catch (err) {
      setError('Current password is incorrect. Please try again.');
      console.error('Password change error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 8) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    
    let strength = 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    
    if (strength < 50) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength < 75) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };
  
  const strength = passwordStrength(formData.newPassword);
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-6 animate-fadeIn">
              <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="text-4xl font-serif text-white mb-2">Password Updated Successfully</h1>
            <p className="text-gray-400">Your account password has been changed</p>
          </div>
          
          <div className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/20">
            <div className="space-y-6 text-center">
              <div className="bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-lg p-6">
                <Lock className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
                <p className="text-gray-300 mb-4">
                  Your password has been successfully updated. Use your new password the next time you sign in.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Encrypted and stored securely</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => router.replace('/dashboard/settings')}
                  className="w-full"
                >
                  Back to Settings
                </Button>
                <p className="text-xs text-gray-500">
                  Redirecting automatically in 3 seconds...
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Password updated on {new Date().toLocaleString('en-US', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.replace('/dashboard/settings')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-3">Change Password</h1>
          <p className="text-gray-400">Update your account password to keep your account secure</p>
        </div>
        
        <div className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="border-t border-[#D4AF37]/10 pt-6">
              {/* New Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Minimum 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Password Strength:</span>
                      <span className={`text-xs font-medium ${
                        strength.label === 'Strong' ? 'text-green-500' :
                        strength.label === 'Medium' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="w-full bg-[#1A1A1A] rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${strength.strength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Re-enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Password Requirements */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-lg p-5">
              <p className="text-xs text-gray-400 mb-3 font-medium">Password Requirements:</p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className={`flex items-center gap-2 ${formData.newPassword.length >= 8 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                  <CheckCircle className="w-4 h-4" />
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${formData.newPassword && formData.newPassword === formData.confirmPassword ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                  <CheckCircle className="w-4 h-4" />
                  <span>Passwords match</span>
                </div>
                <div className={`flex items-center gap-2 ${formData.currentPassword && formData.newPassword && formData.currentPassword !== formData.newPassword ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                  <CheckCircle className="w-4 h-4" />
                  <span>Different from current password</span>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-500 text-sm font-medium">Error</p>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}
            
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.replace('/dashboard/settings')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isLoading}
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Security Tips */}
        <div className="mt-6 bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <h3 className="text-white font-serif text-lg mb-4">Security Tips</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">•</span>
              <span>Use a unique password that you don't use on other websites</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">•</span>
              <span>Include a mix of uppercase, lowercase, numbers, and special characters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">•</span>
              <span>Avoid common words, phrases, or personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">•</span>
              <span>Change your password regularly to maintain account security</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
