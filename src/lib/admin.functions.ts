import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type AdminLead = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string | null;
  intent: string | null;
  interested_variant: string | null;
  page_url: string | null;
  created_at: string;
};

async function verifyAdmin(
  supabase: SupabaseClient<Database>,
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
      .select("id, name, mobile, email, city, intent, interested_variant, page_url, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw error;
    return { leads: (data ?? []) as AdminLead[] };
  });

/** Permanently deletes one lead. Admin only. */
export const deleteLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data || typeof data.id !== "string" || data.id.length < 10) {
      throw new Response("Invalid lead id", { status: 400 });
    }
    return { id: data.id };
  })
  .handler(async ({ context, data }) => {
    await verifyAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").delete().eq("id", data.id);
    if (error) throw error;
    return { deleted: true };
  });
