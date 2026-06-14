import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function MedicalDisclaimer() {
  return (
    <div className="bg-renew-mist border border-renew-border p-4 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-renew-clay flex-shrink-0 mt-0.5" />
      <p className="text-sm text-renew-muted leading-relaxed">
        <strong>Medical Disclaimer:</strong> The content on RENEW is for informational purposes only
        and does not constitute medical advice. Always consult a qualified healthcare professional
        before making health-related decisions.{" "}
        <Link href="/disclaimer" className="text-renew-sage underline hover:no-underline font-medium">
          Read full disclaimer
        </Link>
      </p>
    </div>
  );
}
