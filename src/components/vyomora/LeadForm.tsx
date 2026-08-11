import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { User, Phone, Mail, MapPin, type LucideIcon } from "lucide-react";

import { submitLead } from "@/lib/leads.functions";
import { COUNTRIES, DEFAULT_COUNTRY } from "./countries";


export type LeadValues = { name: string; mobile: string; email: string; city?: string };

type Props = {
  cta?: string;
  compact?: boolean;
  intent?: string;
  withCity?: boolean;
  /** "line": underline-only fields, +91 phone prefix, centered submit */
  variant?: "boxed" | "line";
  onSuccess: (values: LeadValues, intent?: string) => void;
};


type Errs = Partial<Record<keyof LeadValues, string | undefined>>;

type TextKey = "name" | "mobile" | "email" | "city";

const FIELD_ICONS: Record<TextKey, LucideIcon> = {
  name: User,
  mobile: Phone,
  email: Mail,
  city: MapPin,
};

const errorsFor = (v: LeadValues, withCity?: boolean, dial = "91") => {
  const e: Errs = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please enter your full name";
  else if (name.length > 80) e.name = "Name is too long";
  const mobile = v.mobile.trim();
  if (dial === "91") {
    if (!/^[6-9]\d{9}$/.test(mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number";
  } else if (!/^\d{6,15}$/.test(mobile)) {
    e.mobile = "Enter a valid phone number";
  }
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim()))
    e.email = "Enter a valid email address";
  else if (v.email.trim().length > 120) e.email = "Email is too long";
  if (withCity) {
    const city = v.city?.trim() ?? "";
    if (city.length < 2) e.city = "Please enter your current city";
    else if (city.length > 60) e.city = "City name is too long";
  }
  return e;
};

export function LeadForm({ cta = "Submit", compact, intent, withCity, variant = "line", onSuccess }: Props) {
  const [values, setValues] = useState<LeadValues>({ name: "", mobile: "", email: "", city: "" });
  const [errors, setErrors] = useState<Errs>({});
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const send = useServerFn(submitLead);

  const line = variant === "line";

  const inputClass = line
    ? "w-full border-0 border-b border-border bg-transparent px-1.5 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-gold"
    : "w-full rounded-md border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  const field = (key: TextKey, label: string, extra?: Record<string, string>) => {
    const Icon = FIELD_ICONS[key];
    return (
      <div>
        <label htmlFor={`${intent ?? "lead"}-${key}`} className="sr-only">
          {label}
        </label>
        <div className={line ? "flex items-stretch" : "relative"}>
          {line ? (
            key === "mobile" ? (
              <span className="relative flex shrink-0 items-center gap-1 border-b border-border bg-secondary px-2.5 text-base text-foreground">
                <span aria-hidden>{country.flag}</span> +{country.dial}
                <select
                  aria-label="Country code"
                  value={country.iso}
                  onChange={(ev) => {
                    const next = COUNTRIES.find((c) => c.iso === ev.target.value);
                    if (next) setCountry(next);
                    setErrors((p) => ({ ...p, mobile: undefined }));
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.iso}>
                      {c.flag} {c.name} (+{c.dial})
                    </option>
                  ))}
                </select>
              </span>
            ) : null
          ) : (
            <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <input
            id={`${intent ?? "lead"}-${key}`}
            value={values[key]}
            placeholder={label}
            aria-invalid={Boolean(errors[key])}
            onChange={(e) => {
              const next = key === "mobile" ? e.target.value.replace(/\D/g, "").slice(0, country.dial === "91" ? 10 : 15) : e.target.value;
              setValues((v) => ({ ...v, [key]: next }));
              setErrors((p) => ({ ...p, [key]: undefined }));
            }}
            className={inputClass}
            {...extra}
          />
        </div>
        {errors[key] ? <p className="mt-1 text-xs text-destructive">{errors[key]}</p> : null}
      </div>
    );
  };


  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const next = errorsFor(values, withCity, country.dial);
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setBusy(true);
        setFailed(false);
        const payload: LeadValues = {
          name: values.name.trim(),
          mobile: `+${country.dial}${values.mobile.trim()}`,
          email: values.email.trim(),
        };
        if (withCity) payload.city = values.city?.trim() ?? "";
        try {
          await send({
            data: {
              name: payload.name,
              mobile: payload.mobile,
              email: payload.email,
              ...(payload.city ? { city: payload.city } : {}),
              ...(intent ? { intent } : {}),
            },
          });
          onSuccess(payload, intent);
          setValues({ name: "", mobile: "", email: "", city: "" });
        } catch {
          setFailed(true);
        } finally {
          setBusy(false);
        }
      }}

      className={line ? (compact ? "grid gap-3 sm:grid-cols-3" : "grid gap-2.5") : compact ? "grid gap-3 sm:grid-cols-3" : "grid gap-3"}
    >
      {field("name", line ? "Name" : "Full name", { autoComplete: "name", maxLength: "80" })}
      {field("mobile", line ? "Phone" : "Mobile number", { inputMode: "numeric", autoComplete: "tel" })}
      {field("email", line ? "E-Mail Address" : "Email address", { type: "email", autoComplete: "email", maxLength: "120" })}
      {withCity ? field("city", "Current city", { autoComplete: "address-level2", maxLength: "60" }) : null}
      <button
        type="submit"
        disabled={busy}
        className={
          line
            ? `${compact ? "sm:col-span-3" : ""} hero-cta mx-auto mt-3 inline-flex items-center justify-center rounded-md px-10 py-3 text-sm font-semibold tracking-wide shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-70`
            : `${compact ? "sm:col-span-3" : ""} cta-blink mt-1 inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold tracking-wide shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:animate-none disabled:bg-primary disabled:opacity-70`
        }
      >
        {busy ? "Sending…" : cta}
      </button>
      {failed ? (
        <p className="mt-2 text-xs text-destructive">
          Something went wrong. Please try again or call our sales desk.
        </p>
      ) : null}

    </form>
  );
}
