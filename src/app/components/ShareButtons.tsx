"use client";

import { Twitter, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  variant?: "light" | "dark";
}

export default function ShareButtons({ title, url, variant = "dark" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const isLight = variant === "light";

  const shareLinks = [
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-semibold uppercase tracking-wider mr-1 ${isLight ? "text-white/55" : "text-gray-400"}`}>
        Share
      </span>
      {shareLinks.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={`p-2 rounded-full border transition-colors ${
            isLight
              ? "border-white/20 text-white/70 hover:border-renew-accent hover:text-renew-accent"
              : "border-gray-200 text-gray-500 hover:text-renew-sage hover:border-renew-sage"
          }`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className={`p-2 rounded-full border transition-colors ${
          isLight
            ? "border-white/20 text-white/70 hover:border-renew-accent hover:text-renew-accent"
            : "border-gray-200 text-gray-500 hover:text-renew-sage hover:border-renew-sage"
        }`}
      >
        {copied ? <Check className="w-4 h-4 text-renew-sage" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
