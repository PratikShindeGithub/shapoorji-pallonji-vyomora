export type LeadInput = {
  name: string;
  mobile: string;
  email: string;
  city?: string;
  intent?: string;
};

export async function saveLead(input: LeadInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert({
      name: input.name,
      mobile: input.mobile,
      email: input.email,
      city: input.city ?? null,
      intent: input.intent ?? null,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function markLeadEmailed(id: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("leads").update({ email_sent: true }).eq("id", id);
}
