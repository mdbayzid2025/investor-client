'use client';

import React, { useState } from 'react';

import { Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../button';

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
          
      console.log('Login successful:', { email });                      
      router.replace('/user-dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-[#0A0A0A] to-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">          
          <h1 className="text-4xl font-serif text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2 accent-[#D4AF37]" />
                Remember me
              </label>
              <Link href="/reset-password" className="text-[#D4AF37] hover:text-[#E4C77D]">
                Forgot password?
              </Link>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            {error && (
              <div className="mt-2 text-sm text-red-500">
                {error}
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#D4AF37] hover:text-[#E4C77D] font-medium">
              Sign up
            </Link>
          </div>
        </div>
        
        {/* Demo Info */}
        <div className="mt-6 text-center space-y-2">
          <Link 
            href="/password-reset-demo" 
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#D4AF37] transition-colors block"
          >
            <span>🎯</span>
            <span>Test Password Reset Flow (Demo)</span>
          </Link>
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#D4AF37] transition-colors block"
          >
            <span>🔐</span>
            <span>Admin Dashboard (Demo)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}