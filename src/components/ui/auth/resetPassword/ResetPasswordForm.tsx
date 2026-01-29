'use client'
import React, { useState } from 'react';

import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../button';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful request
      console.log('Password reset email sent to:', email);
      setIsSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-black via-[#0A0A0A] to-black">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {/* <Logo className="justify-center mb-8" /> */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-6">
              <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="text-4xl font-serif text-white mb-2">Check Your Email</h1>
            <p className="text-gray-400">We've sent password reset instructions to</p>
            <p className="text-[#D4AF37] font-medium mt-2">{email}</p>
          </div>
          
          <div className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/20">
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm">
                If an account exists with this email address, you will receive a password reset link within the next few minutes.
              </p>
              
              <p className="text-gray-400 text-xs">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              {/* Demo Mode - Show Reset Link */}
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4 mt-6">
                <p className="text-[#D4AF37] text-sm font-medium mb-3">
                  🎯 Demo Mode - Test Reset Password Flow
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  Since this is a demo, click the button below to simulate clicking the reset link from your email.
                </p>
                <Link href="/new-password?token=demo-reset-token-12345">
                  <Button className="w-full">
                    Open Password Reset Link (Demo)
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4 border-t border-[#D4AF37]/10">
                <Link href="/login">
                  <Button variant="outline" className="w-full mb-3">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
              
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="text-[#D4AF37] hover:text-[#E4C77D] text-sm transition-colors"
              >
                Try Different Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
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
              {isLoading ? 'Sending Instructions...' : 'Send Reset Link'}
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