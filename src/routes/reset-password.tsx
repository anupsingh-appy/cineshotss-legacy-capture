import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password | Cineshotss" },
      { name: "description", content: "Set a new password for your Cineshotss admin account." },
      { property: "og:title", content: "Reset Password | Cineshotss" },
      { property: "og:description", content: "Set a new password for your Cineshotss admin account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // The recovery link carries `type=recovery` in the URL hash; the Supabase
    // client exchanges it for a session and emits PASSWORD_RECOVERY.
    const hash = window.location.hash;
    const isRecoveryLink = hash.includes("type=recovery");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setValid(true);
        setChecking(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      // A session may already exist from the hash exchange.
      if (data.session && isRecoveryLink) {
        setValid(true);
      }
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await supabase.auth.signOut();
      toast.success("Password updated. Please sign in with your new password.");
      await navigate({ to: "/admin/login", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update password");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-charcoal text-ondark">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between px-6 py-8 md:px-12 md:py-10">
          <Link to="/" className="font-display text-xl uppercase tracking-[0.34em] md:text-2xl">
            {BRAND.name}
          </Link>
          <div className="my-16 max-w-md">
            <p className="eyebrow text-ondark/60">Private studio access</p>
            <h1 className="display-md mt-5">A fresh key to the studio.</h1>
            <p className="body-editorial mt-6 text-ondark/65">
              Choose a new password to keep your gallery safe.
            </p>
          </div>
          <p className="text-xs text-ondark/45">{BRAND.statement}</p>
        </div>

        <div className="flex items-center bg-ivory px-6 py-16 text-foreground md:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <Link to="/admin/login" className="eyebrow text-muted-foreground">
              ← Back to sign in
            </Link>

            {checking ? (
              <p className="body-editorial mt-10">Verifying your reset link…</p>
            ) : valid ? (
              <>
                <h2 className="display-md mt-8">Set a new password</h2>
                <p className="body-editorial mt-4">
                  Your new password must be at least 8 characters long.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <label className="block">
                    <span className="eyebrow mb-2 block text-muted-foreground">New password</span>
                    <input
                      required
                      minLength={8}
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="form-input-lux"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-muted-foreground">Confirm password</span>
                    <input
                      required
                      minLength={8}
                      type="password"
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(event) => setConfirm(event.target.value)}
                      className="form-input-lux"
                    />
                  </label>

                  <Button type="submit" disabled={busy} className="btn-solid-lux h-auto w-full rounded-none">
                    {busy ? "Updating…" : "Update password"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h2 className="display-md mt-8">Link expired</h2>
                <p className="body-editorial mt-4">
                  This reset link is missing, invalid or has expired. Request a new one from the sign-in
                  page.
                </p>
                <Link
                  to="/admin/login"
                  className="btn-solid-lux mt-10 inline-flex items-center justify-center px-8 py-4"
                >
                  Back to sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
