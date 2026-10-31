export type LeadInput = {
  name: string;
  mobile: string;
  email: string;
  city?: string | undefined;
  intent?: string | undefined;
  interested_variant?: string | undefined;
  page_url?: string | undefined;
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
      interested_variant: input.interested_variant ?? null,
      page_url: input.page_url ?? null,
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

/**
 * Emails the sales desk with the lead details. The customer receives no
 * email — brochure and floor plans are never sent to them.
 * Never throws — a failed email must not fail the form submission.
 */
export async function sendLeadEmails(id: string, input: LeadInput) {
  const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
  const salesInbox = "contact@homelogic.co.in";
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  let emailed = false;

  if (salesInbox) {
    try {
      await sendTemplateEmail("lead-notification", salesInbox, {
        templateData: {
          name: input.name,
          mobile: input.mobile,
          email: input.email,
          city: input.city ?? "",
          intent: input.intent ?? "",
          submittedAt,
        },
        idempotencyKey: `lead-notification-${id}`,
      });
      emailed = true;
    } catch (error) {
      console.error("lead notification email failed", error);
    }
  }

  if (emailed) await markLeadEmailed(id);
  return emailed;
}
