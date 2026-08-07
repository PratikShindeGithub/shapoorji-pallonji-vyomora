import { useState } from "react";

export type LeadValues = { name: string; mobile: string; email: string; city?: string };

type Props = {
  cta?: string;
  compact?: boolean;
  intent?: string;
  withCity?: boolean;
  onSuccess: (values: LeadValues, intent?: string) => void;
};

export const CITY_OPTIONS = [
  "Pune",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Delhi NCR",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Nagpur",
  "Nashik",
  "Other City in India",
  "Outside India (NRI)",
];

type Errs = Partial<Record<keyof LeadValues, string | undefined>>;

type TextKey = "name" | "mobile" | "email";

const errorsFor = (v: LeadValues, withCity?: boolean) => {
  const e: Errs = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please enter your full name";
  else if (name.length > 80) e.name = "Name is too long";
  if (!/^[6-9]\d{9}$/.test(v.mobile.trim()))
    e.mobile = "Enter a valid 10-digit Indian mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim()))
    e.email = "Enter a valid email address";
  else if (v.email.trim().length > 120) e.email = "Email is too long";
  if (withCity && !v.city) e.city = "Please select your current city";
  return e;
};

export function LeadForm({ cta = "Get Price Breakup", compact, intent, withCity, onSuccess }: Props) {
  const [values, setValues] = useState<LeadValues>({ name: "", mobile: "", email: "", city: "" });
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);

  const inputClass =
    "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  const field = (key: TextKey, label: string, extra?: Record<string, string>) => (
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
        className={inputClass}
        {...extra}
      />
      {errors[key] ? <p className="mt-1 text-xs text-destructive">{errors[key]}</p> : null}
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const next = errorsFor(values, withCity);
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
              ...(withCity ? { city: values.city } : {}),
            },
            intent,
          );
          setValues({ name: "", mobile: "", email: "", city: "" });
        }, 450);
      }}
      className={compact ? "grid gap-3 sm:grid-cols-3" : "grid gap-3"}
    >
      {field("name", "Full name", { autoComplete: "name", maxLength: "80" })}
      {field("mobile", "Mobile number", { inputMode: "numeric", autoComplete: "tel" })}
      {field("email", "Email address", { type: "email", autoComplete: "email", maxLength: "120" })}
      {withCity ? (
        <div className={compact ? "sm:col-span-3" : ""}>
          <label htmlFor={`${intent ?? "lead"}-city`} className="sr-only">
            Current city
          </label>
          <select
            id={`${intent ?? "lead"}-city`}
            value={values.city}
            aria-invalid={Boolean(errors.city)}
            onChange={(e) => {
              setValues((v) => ({ ...v, city: e.target.value }));
              setErrors((p) => ({ ...p, city: undefined }));
            }}
            className={`${inputClass} ${values.city ? "" : "text-muted-foreground"}`}
          >
            <option value="">Current city</option>
            {CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city ? <p className="mt-1 text-xs text-destructive">{errors.city}</p> : null}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className={`${compact ? "sm:col-span-3" : ""} cta-blink mt-1 inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold tracking-wide shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:animate-none disabled:bg-primary disabled:opacity-70`}
      >
        {busy ? "Sending…" : cta}
      </button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        By submitting you authorise our sales desk to contact you regarding this project.
      </p>
    </form>
  );
}
