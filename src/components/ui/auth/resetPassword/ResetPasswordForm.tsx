'use client'
import React, { useState } from 'react';

import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../button';
import { useRouter } from 'next/navigation';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState('');
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual password reset API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      
      // Mock successful request
      router.push("otp-verify")
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-black via-[#0A0A0A] to-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <Logo className="justify-center mb-8" /> */}
          <h1 className="text-4xl font-serif text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive reset instructions</p>
        </div>
        
        <div className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending OTP' : 'Send OTP'}
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
              className="inline-flex items-center text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>For security purposes, password reset links expire after 1 hour.</p>
        </div>
      </div>
    </div>
  );
}