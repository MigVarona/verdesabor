"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "renew-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl p-5 md:p-6">
        <div className="flex gap-4">
          <Cookie className="w-6 h-6 text-renew-sage flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-renew-dark mb-1">We value your privacy</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies for analytics and to display personalized ads. By clicking
              &quot;Accept&quot;, you consent to our use of cookies. Read our{" "}
              <Link href="/privacy" className="text-renew-sage underline hover:no-underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button onClick={accept} size="sm" className="bg-renew-dark hover:bg-gray-800">
                Accept all
              </Button>
              <Button onClick={decline} variant="outline" size="sm">
                Decline
              </Button>
            </div>
          </div>
          <button
            onClick={decline}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
