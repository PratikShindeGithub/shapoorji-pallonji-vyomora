export type LeadInput = {
  name: string;
  mobile: string;
  email: string;
  city?: string | undefined;
  intent?: string | undefined;
};

const SITE_ORIGIN = "https://shapoorjipallonjivyomora.site";
const FLOOR_PLAN_PATH =
  "/__l5e/assets-v1/818277c5-5381-41df-b296-6ff6ed19dbf1/vyomora-floor-plans.pdf";

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

/**
 * Emails the sales desk with the lead details and sends the lead their floor plans.
 * Never throws — a failed email must not fail the form submission.
 */
export async function sendLeadEmails(id: string, input: LeadInput) {
  const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
  const salesInbox = process.env["LEAD_NOTIFY_EMAIL"];
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

  try {
    await sendTemplateEmail("lead-floor-plan", input.email, {
      templateData: {
        name: input.name.split(" ")[0] ?? input.name,
        floorPlanUrl: `${SITE_ORIGIN}${FLOOR_PLAN_PATH}`,
      },
      idempotencyKey: `lead-floor-plan-${id}`,
    });
  } catch (error) {
    console.error("lead floor plan email failed", error);
  }

  if (emailed) await markLeadEmailed(id);
  return emailed;
}
