"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "../Container/Container";

export function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#D4AF37]/10">
      <Container>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3`}>
            <Image
              height={50}
              width={150}
              src="/logo.png"
              alt="Investors Hub"
              className="h-20 object-cover overflow-visible"
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm transition-colors ${
                  pathname === link.path
                    ? "text-[#D4AF37]"
                    : "text-gray-300 hover:text-[#D4AF37]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                size="lg"
                variant="link"
                className="text-white cursor-pointer"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              {" "}
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
