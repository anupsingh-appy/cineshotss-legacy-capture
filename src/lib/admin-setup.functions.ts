import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const initialPasswordSchema = z.object({
  password: z.string().min(8, "Your password must be at least 8 characters.").max(128, "Your password is too long."),
});

function getConfiguredAdminEmail() {
  const email = process.env["ADMIN_EMAIL"]?.trim().toLowerCase();
  if (!email) throw new Error("Initial admin setup is not configured.");
  return email;
}

export const getInitialAdminSetupStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });

  if (error) throw new Error("Unable to check initial admin setup.");

  return { available: data.users.length === 0, adminEmail: getConfiguredAdminEmail() };
});

export const createInitialAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => initialPasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const adminEmail = getConfiguredAdminEmail();
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });

    if (listError) throw new Error("Unable to verify initial admin setup.");
    if (existingUsers.users.length > 0) {
      return { created: false, reason: "closed" as const };
    }

    const { data: createdUser, error } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: data.password,
      email_confirm: true,
    });

    if (error || !createdUser.user) {
      if (error?.message.toLowerCase().includes("already been registered")) {
        return { created: false, reason: "closed" as const };
      }
      throw new Error("Unable to create the initial admin account.");
    }

    return { created: true as const };
  });