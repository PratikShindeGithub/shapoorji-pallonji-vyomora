import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminLead = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string | null;
  intent: string | null;
  created_at: string;
};

async function verifyAdmin(
  supabase: Parameters<Parameters<typeof requireSupabaseAuth>[0]>[0]["context"]["supabase"],
  userId: string,
) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Response("Forbidden", { status: 403 });
}

/** True when the signed-in caller has the admin role. */
export const isAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { admin: Boolean(data) };
  });

/** Grants the caller the admin role, but only while no admin exists yet. */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (error) throw error;
    if ((count ?? 0) > 0) return { granted: false };
    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (insertError) throw insertError;
    return { granted: true };
  });

export type WhatsappClick = {
  id: string;
  source: string;
  section: string | null;
  unit: string | null;
  scroll_depth: number | null;
  device: string | null;
  created_at: string;
};

/** WhatsApp click events for the admin dashboard. RLS restricts this to admins. */
export const listWhatsappClicks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("whatsapp_clicks")
      .select("id, source, section, unit, scroll_depth, device, created_at")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) throw error;
    return { clicks: (data ?? []) as WhatsappClick[] };
  });

/** Lead list for the admin dashboard. RLS restricts this to admins. */
export const listLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("id, name, mobile, email, city, intent, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw error;
    return { leads: (data ?? []) as AdminLead[] };
  });
