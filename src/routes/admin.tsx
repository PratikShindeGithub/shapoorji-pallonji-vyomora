import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LogOut, RefreshCw, TrendingUp, Users, CalendarDays, MapPin } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  claimFirstAdmin,
  isAdmin,
  listLeads,
  listWhatsappClicks,
  type AdminLead,
  type WhatsappClick,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Leads Dashboard — Vyomora Admin" },
      { name: "description", content: "Private admin dashboard for Vyomora Hinjawadi lead enquiries." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Leads Dashboard — Vyomora Admin" },
      { property: "og:description", content: "Private admin dashboard for Vyomora Hinjawadi lead enquiries." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [clicks, setClicks] = useState<WhatsappClick[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAdmin = useServerFn(isAdmin);
  const claimAdmin = useServerFn(claimFirstAdmin);
  const fetchLeads = useServerFn(listLeads);
  const fetchClicks = useServerFn(listWhatsappClicks);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      let { admin: ok } = await checkAdmin({});
      if (!ok) {
        const claim = await claimAdmin({});
        ok = claim.granted;
      }
      setAdmin(ok);
      if (ok) {
        const [{ leads: rows }, { clicks: clickRows }] = await Promise.all([
          fetchLeads({}),
          fetchClicks({}),
        ]);
        setLeads(rows);
        setClicks(clickRows);
      }
    } catch {
      setError("Could not load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSignedIn(Boolean(data.session));
      setReady(true);
      if (data.session) void load();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
      if (!session) {
        setAdmin(false);
        setLeads([]);
        setClicks([]);
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!signedIn) return <AdminLogin onSignedIn={load} />;

  if (!admin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
        <div className="max-w-sm">
          <h1 className="text-2xl font-semibold text-foreground">Access restricted</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This account does not have dashboard access. Ask an existing admin to grant it.
          </p>
          <button
            onClick={() => void supabase.auth.signOut()}
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      leads={leads}
      clicks={clicks}
      loading={loading}
      error={error}
      onRefresh={() => void load()}
      onSignOut={() => void supabase.auth.signOut()}
    />
  );
}

function AdminLogin({ onSignedIn }: { onSignedIn: () => Promise<void> }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setMessage(null);
          try {
            const fn = mode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
            const { error } = await fn.call(supabase.auth, {
              email: email.trim(),
              password,
              ...(mode === "signup"
                ? { options: { emailRedirectTo: `${window.location.origin}/admin` } }
                : {}),
            } as never);
            if (error) {
              setMessage(error.message);
              return;
            }
            await onSignedIn();
          } finally {
            setBusy(false);
          }
        }}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-7 shadow-soft"
      >
        <h1 className="text-xl font-semibold text-foreground">Vyomora Leads Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Sign in to view enquiries." : "Create the admin account."}
        </p>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-gold"
          />
        </label>

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-gold"
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>

        {message ? <p className="mt-3 text-xs text-destructive">{message}</p> : null}

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMessage(null);
          }}
          className="mt-4 w-full text-xs font-semibold text-muted-foreground underline-offset-2 hover:underline"
        >
          {mode === "signin" ? "First time? Create the admin account" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

const DAY_MS = 86_400_000;

function Dashboard({
  leads,
  clicks,
  loading,
  error,
  onRefresh,
  onSignOut,
}: {
  leads: AdminLead[];
  clicks: WhatsappClick[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSignOut: () => void;
}) {
  const stats = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const today = leads.filter((l) => new Date(l.created_at).getTime() >= startOfToday.getTime()).length;
    const week = leads.filter((l) => now - new Date(l.created_at).getTime() <= 7 * DAY_MS).length;
    const cities = new Set(leads.map((l) => (l.city ?? "").trim().toLowerCase()).filter(Boolean)).size;
    return { total: leads.length, today, week, cities };
  }, [leads]);

  const chart = useMemo(() => {
    const buckets = new Map<string, number>();
    for (let i = 29; i >= 0; i -= 1) {
      const d = new Date(Date.now() - i * DAY_MS);
      buckets.set(d.toISOString().slice(0, 10), 0);
    }
    for (const lead of leads) {
      const key = new Date(lead.created_at).toISOString().slice(0, 10);
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return Array.from(buckets, ([date, count]) => ({
      date,
      label: new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      count,
    }));
  }, [leads]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Leads Dashboard</h1>
            <p className="text-xs text-muted-foreground">Shapoorji Pallonji Vyomora, Hinjawadi</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-4 w-4" />} label="Total leads" value={stats.total} />
          <StatCard icon={<CalendarDays className="h-4 w-4" />} label="Today" value={stats.today} />
          <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Last 7 days" value={stats.week} />
          <StatCard icon={<MapPin className="h-4 w-4" />} label="Cities" value={stats.cities} />
        </section>

        <section className="mt-8 rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Leads over the last 30 days</h2>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#56436f" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#56436f" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={4} stroke="currentColor" className="text-muted-foreground" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="currentColor" className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value) => [value as number, "Leads"]}
                />
                <Area type="monotone" dataKey="count" stroke="#56436f" strokeWidth={2} fill="url(#leadFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Lead details</h2>
            <span className="text-xs text-muted-foreground">{leads.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">City</th>
                  <th className="px-5 py-3 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                      {loading ? "Loading leads…" : "No leads yet."}
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-border">
                      <td className="px-5 py-3 font-medium text-foreground">{lead.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">
                        <a href={`tel:${lead.mobile}`} className="hover:text-foreground">
                          {lead.mobile}
                        </a>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        <a href={`mailto:${lead.email}`} className="hover:text-foreground">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{lead.city || "—"}</td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {new Date(lead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}
