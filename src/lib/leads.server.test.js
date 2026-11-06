import { beforeEach, expect, mock, test } from "bun:test";

const send = mock(async (..._args) => ({ sent: true }));
const eq = mock(async () => ({}));
mock.module("@/lib/email-templates/send-email", () => ({ sendTemplateEmail: send }));
mock.module("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { from: () => ({ update: () => ({ eq }) }) },
}));
const { sendLeadEmails } = await import("./leads.server");
const lead = { name: "Notification Test", mobile: "+919876543210", email: "test@example.com", city: "Pune", intent: "hero" };

beforeEach(() => { send.mockClear(); eq.mockClear(); });

test("each saved lead notifies Pratik and retains sales notification and customer acknowledgment", async () => {
  await sendLeadEmails("test-lead-id", lead);
  expect(send.mock.calls.map((call) => call.slice(0, 2))).toEqual([
    ["lead-notification", "contact@homelogic.co.in"],
    ["lead-notification", "pratikshinde8494@gmail.com"],
    ["lead-acknowledgment", "test@example.com"],
  ]);
  expect(send.mock.calls[1]?.[2]).toMatchObject({
    templateData: lead,
    idempotencyKey: "lead-notification-owner-test-lead-id",
  });
});

test("sales email failure does not prevent the additional owner notification", async () => {
  send.mockImplementationOnce(async () => { throw new Error("test send failure"); });
  await sendLeadEmails("independent-test-id", lead);
  expect(send.mock.calls[1]?.[1]).toBe("pratikshinde8494@gmail.com");
  expect(send.mock.calls[2]?.[0]).toBe("lead-acknowledgment");
});