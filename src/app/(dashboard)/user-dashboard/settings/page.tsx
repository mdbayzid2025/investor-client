/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import SettingPage from "@/components/dashboard/SettingPage";
import { Shield, Globe, Lock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Settings() {
  const router = useRouter();

  const [settings, setSettings] = useState({
    language: "English",
    currency: "ZAR (R)",
    timezone: "South Africa (GMT+2)",
  });
  const [loading, setLoading] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  return (
    <div className="p-8">
      <SettingPage />
    </div>
  );
}
