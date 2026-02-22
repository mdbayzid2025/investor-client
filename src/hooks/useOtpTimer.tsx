'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useOtpTimer = (resetKey?: number) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null); // 👈 null = loading

  useEffect(() => {
    const expiry = Cookies.get("otpExpiry");
    if (!expiry) {
      setSecondsLeft(0); // no cookie = treat as expired
      return;
    }

    // Run immediately so there's no 1s delay on first render
    const remaining = Number(expiry) - Date.now();
    if (remaining <= 0) {
      setSecondsLeft(0);
      return;
    }
    setSecondsLeft(Math.floor(remaining / 1000));

    const interval = setInterval(() => {
      const remaining = Number(expiry) - Date.now();
      if (remaining <= 0) {
        setSecondsLeft(0);
        clearInterval(interval);
      } else {
        setSecondsLeft(Math.floor(remaining / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resetKey]);

  return secondsLeft; // null | number
};