"use client";

import { Button } from "@/components/ui/button";
import { openCookieSettings } from "./CookieConsent";

export default function ManageCookiePreferences() {
  return (
    <Button onClick={openCookieSettings} className="mt-4 bg-renew-dark hover:bg-gray-800">
      Manage cookie preferences
    </Button>
  );
}
