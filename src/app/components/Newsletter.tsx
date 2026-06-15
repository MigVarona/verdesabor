"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
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
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed. Check your inbox soon.");
        setEmail("");
        setWebsite("");
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
    <section className="py-16 md:py-20 bg-renew-paper border-t border-renew-border">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden border border-renew-dark bg-renew-ink text-white shadow-card md:grid-cols-[1fr_0.9fr]">
          <div className="p-8 md:p-10 lg:p-12">
            <div className="w-10 h-1 bg-renew-accent mb-6" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-renew-accent mb-3">Newsletter</p>
            <h2 className="font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
              The weekly health brief.
            </h2>
            <p className="mt-5 text-white/65 leading-relaxed">
              One concise email on nutrition, biohacking, neuroscience, and longevity. Built for readers who want signal over noise.
            </p>
          </div>

          <div className="border-t border-white/10 bg-white p-8 text-renew-dark md:border-l md:border-t-0 md:p-10 lg:p-12">
            {status === "success" ? (
              <div className="flex items-center gap-2 text-renew-sage">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1 border-renew-border focus-visible:ring-renew-sage"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 bg-renew-dark text-white hover:bg-renew-ink font-semibold"
                >
                  {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p className="text-red-500 text-sm mt-3">{message}</p>
            )}
            <p className="mt-5 text-xs leading-relaxed text-renew-muted">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
