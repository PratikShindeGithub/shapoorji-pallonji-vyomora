import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const clickSchema = z.object({
  source: z.string().trim().min(1).max(60),
  section: z.string().trim().max(60).optional(),
  unit: z.string().trim().max(60).optional(),
  scrollDepth: z.number().int().min(0).max(100).optional(),
  device: z.enum(["mobile", "desktop"]).optional(),
  path: z.string().trim().max(200).optional(),
});

/** Records a WhatsApp button click. Public by design: no PII is stored. */
export const trackWhatsappClick = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => clickSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("whatsapp_clicks").insert({
      source: data.source,
      section: data.section ?? null,
      unit: data.unit ?? null,
      scroll_depth: data.scrollDepth ?? null,
      device: data.device ?? null,
      path: data.path ?? null,
    });
    return { ok: true };
  });
