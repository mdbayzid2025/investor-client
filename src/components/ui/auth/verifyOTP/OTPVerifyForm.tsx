'use client'
import { useState, useEffect, useRef, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import { useResendOtpMutation, useVerifyOTPMutation } from '@/redux/slice/authApi';
import { toast } from 'sonner';


export default function OTPVerifyForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const [resendOtp] = useResendOtpMutation();
  const [verifyOtp] = useVerifyOTPMutation()

  const email = Cookies.get("verify-email");
  const resetEmail = Cookies.get("reset-email");
  const router = useRouter();

  const secondsLeft = useOtpTimer(resetKey);

  useEffect(() => {
    if (secondsLeft === null) return;
        setTimeLeft(secondsLeft);
  }, [secondsLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');

    if (pasteData.length > 0) {
      const newOtp = [...otp];
      pasteData.forEach((char: string, i: number) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);

      const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete verification code.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp({ email, oneTimeCode: Number(code) })?.unwrap();

      if (response?.success) {
        toast?.success(response?.message);
        Cookies.set("resetToken", response?.data?.verifyToken)
        router.replace(resetEmail ? "/new-password" : "/login");
        setIsLoading(false);
      }

    } catch (err: any) {
      toast?.success(err?.data?.message);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleResend = async () => {

    try {
      const response = await resendOtp({ email })?.unwrap();
      if (response?.success) {
        toast.success(response?.message)
        router.refresh()
        Cookies.set("otpExpiry", String(Date.now() + 180_000));

        setResetKey(k => k + 1);
        setIsExpired(false);
        setOtp(['', '', '', '', '', '']);
        setError('');
        setIsLoading(false);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    } catch (error: any) {      
      toast.error(error?.data?.message)
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-linear-to-b from-[#0F0F0F] to-black text-white font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 mb-6 border border-primary/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Security Verification</h1>
          <p className="text-gray-400 text-sm md:text-base px-4">
            We've sent a 6-digit verification code to <br />
            <span className="text-primary font-medium">{email}</span>
          </p>
        </div>

        <div className="bg-[#141414] p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-center text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Enter Verification Code
              </label>

              <div className="flex justify-between gap-2 md:gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el: any) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    disabled={isExpired || isLoading}
                    maxLength={1}
                    className={`w-full h-14 md:h-16 text-center text-2xl font-bold ${isExpired ? 'opacity-50' : ''
                      }`}
                  />
                ))}
              </div>
            </div>

            {isExpired ? (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>This code has expired</AlertDescription>
                </Alert>
                <Button variant="outline" onClick={handleResend} className="w-full">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Resend New Code
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || otp.includes('')}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    'Verify Code'
                  )}
                </Button>

                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center text-gray-500">
                    Code expires in:
                    <span className={`ml-2 font-mono font-bold ${timeLeft < 30 ? 'text-red-400 animate-pulse' : 'text-primary'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResend}
                    disabled={timeLeft > 120}
                    className="text-primary hover:text-[#E4C77D] text-xs md:text-sm p-0 h-auto"
                  >
                    Resend
                  </Button>
                </div>
              </div>
            )}

            {error && !isExpired && (
              <div className="text-xs text-red-500 text-center animate-shake">
                {error}
              </div>
            )}
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Sign In
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] md:text-xs text-gray-600 uppercase tracking-widest leading-relaxed">
            Secure Encrypted Session <br />
            Ref ID: OTP-{Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
