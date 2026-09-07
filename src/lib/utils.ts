import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pushLeadFormSubmit(formId: string, intent?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_form_submit",
    form_id: formId,
    ...(intent && formId !== intent ? { form_intent: intent } : {}),
  });
}
