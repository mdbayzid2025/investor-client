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

  const handleSave = () => {
    setLoading(true);
    console.log(settings);
    // Simulate API call
    setTimeout(() => {
      // localStorage.setItem("userSettings", JSON.stringify(settings));
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const handleReset = () => {
    const defaultSettings = {
      language: "English",
      currency: "ZAR (R)",
      timezone: "South Africa (GMT+2)",
    };
    setSettings(defaultSettings);
    // localStorage.setItem("userSettings", JSON.stringify(defaultSettings));
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="p-8">


      <SettingPage />
    </div>
  );
}
