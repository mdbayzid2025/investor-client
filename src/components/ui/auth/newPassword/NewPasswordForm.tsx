'use client';
import React, { useState } from 'react';

import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../button';

export function NewPasswordForm() {

     const router = useRouter();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

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
    
    try {
      // TODO: Replace with actual password reset API call
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     token,
      //     password: formData.password 
      //   })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful reset
      console.log('Password reset successful');
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.replace('/login');
      }, 3000);
    } catch (err) {
      setError('An error occurred. The reset link may be invalid or expired.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
     <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md ">
        <div className="text-center mb-8">
          {/* <Logo className="justify-center mb-8" /> */}
          <h1 className="text-4xl font-serif text-white mb-2">Create New Password</h1>
          <p className="text-gray-400">Choose a strong password for your account</p>
        </div>
        
        <div className="bg-[#111111] p-8 rounded-xl border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Minimum 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
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
                  className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Re-enter password"
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
            
            <div className="bg-[#1A1A1A] border border-primary/10 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-2">Password requirements:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li className={formData.password.length >= 8 ? '' : 'text-red-600'}>
                  • At least 8 characters
                </li>
                <li className={formData.password === formData.confirmPassword && formData.password ? '' : 'text-red-600'}>
                  • Passwords match
                </li>
              </ul>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
