import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 leading-relaxed">
        <strong>Medical Disclaimer:</strong> The content on RENEW is for informational purposes only
        and does not constitute medical advice. Always consult a qualified healthcare professional
        before making health-related decisions.{" "}
        <Link href="/disclaimer" className="underline hover:no-underline font-medium">
          Read full disclaimer
        </Link>
      </p>
    </div>
  );
}
