import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { saveLead, sendLeadEmails } from "./leads.server";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().regex(/^\+?\d{7,18}$/),
  email: z.string().trim().email().max(120),
  city: z.string().trim().max(60).optional(),
  intent: z.string().trim().max(60).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const id = await saveLead(data);
    const emailed = await sendLeadEmails(id, data);
    return { id, emailed };
  });

