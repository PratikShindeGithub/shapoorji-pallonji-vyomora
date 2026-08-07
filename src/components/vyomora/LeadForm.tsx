import { useState } from "react";

export type LeadValues = { name: string; mobile: string; email: string };

type Props = {
  cta?: string;
  compact?: boolean;
  intent?: string;
  onSuccess: (values: LeadValues, intent?: string) => void;
};

const errorsFor = (v: LeadValues) => {
  const e: Partial<Record<keyof LeadValues, string>> = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please enter your full name";
  else if (name.length > 80) e.name = "Name is too long";
  if (!/^[6-9]\d{9}$/.test(v.mobile.trim()))
    e.mobile = "Enter a valid 10-digit Indian mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim()))
    e.email = "Enter a valid email address";
  else if (v.email.trim().length > 120) e.email = "Email is too long";
  return e;
};

export function LeadForm({ cta = "Get Price Breakup", compact, intent, onSuccess }: Props) {
  const [values, setValues] = useState<LeadValues>({ name: "", mobile: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadValues, string>>>({});
  const [busy, setBusy] = useState(false);

  const field = (key: keyof LeadValues, label: string, extra?: Record<string, string>) => (
    <div>
      <label htmlFor={`${intent ?? "lead"}-${key}`} className="sr-only">
        {label}
      </label>
      <input
        id={`${intent ?? "lead"}-${key}`}
        value={values[key]}
        placeholder={label}
        aria-invalid={Boolean(errors[key])}
        onChange={(e) => {
          const next = key === "mobile" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value;
          setValues((v) => ({ ...v, [key]: next }));
          setErrors((p) => ({ ...p, [key]: undefined }));
        }}
        className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        {...extra}
      />
      {errors[key] ? (
        <p className="mt-1 text-xs text-destructive">{errors[key]}</p>
      ) : null}
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const next = errorsFor(values);
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setBusy(true);
        window.setTimeout(() => {
          setBusy(false);
          onSuccess(
            {
              name: values.name.trim(),
              mobile: values.mobile.trim(),
              email: values.email.trim(),
            },
            intent,
          );
          setValues({ name: "", mobile: "", email: "" });
        }, 450);
      }}
      className={compact ? "grid gap-3 sm:grid-cols-3" : "grid gap-3"}
    >
      {field("name", "Full name", { autoComplete: "name", maxLength: "80" })}
      {field("mobile", "Mobile number", { inputMode: "numeric", autoComplete: "tel" })}
      {field("email", "Email address", { type: "email", autoComplete: "email", maxLength: "120" })}
      <button
        type="submit"
        disabled={busy}
        className={`${compact ? "sm:col-span-3" : ""} mt-1 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-70`}
      >
        {busy ? "Sending…" : cta}
      </button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        By submitting you authorise our sales desk to contact you regarding this project.
      </p>
    </form>
  );
}
