"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for a welcome email soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="py-14 md:py-20 bg-renew-dark">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-renew-accent/20 mb-5">
          <Mail className="w-6 h-6 text-renew-accent" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Stay ahead of the curve
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Get weekly insights on biohacking, nutrition, and longevity delivered straight to your inbox. No spam, ever.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-renew-accent max-w-md mx-auto">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-renew-accent"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="bg-renew-accent text-renew-dark hover:bg-yellow-300 font-semibold"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-3">{message}</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
