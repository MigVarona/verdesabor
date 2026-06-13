"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
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
        setMessage("You're subscribed. Check your inbox soon.");
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
    <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <div className="w-8 h-1 bg-renew-accent mx-auto mb-6" />
          <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-3">Newsletter</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-renew-dark mb-3">
            Stay ahead of the curve
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Weekly insights on biohacking, nutrition, and longevity. No spam, ever.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-renew-sage">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-gray-200 focus-visible:ring-renew-sage"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-renew-sage text-white hover:bg-renew-sage/90 font-semibold"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-500 text-sm mt-3">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
