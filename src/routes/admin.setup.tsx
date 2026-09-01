import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { createInitialAdmin, getInitialAdminSetupStatus } from "@/lib/admin-setup.functions";

export const Route = createFileRoute("/admin/setup")({
  head: () => ({
    meta: [
      { title: "Initial Admin Setup | Cineshotss" },
      { name: "description", content: "Set the initial password for the private Cineshotss admin account." },
      { property: "og:title", content: "Initial Admin Setup | Cineshotss" },
      { property: "og:description", content: "Set the initial password for the private Cineshotss admin account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: InitialAdminSetupPage,
});

function InitialAdminSetupPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    getInitialAdminSetupStatus()
      .then((status) => {
        if (active) {
          setAvailable(status.available);
          setAdminEmail(status.adminEmail);
        }
      })
      .catch(() => {
        if (active) setAvailable(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const result = await createInitialAdmin({ data: { password } });
      if (!result.created) {
        setAvailable(false);
        toast.error("Initial admin setup is already closed.");
        return;
      }

      setPassword("");
      setConfirmPassword("");
      toast.success("Admin account created securely.");
      await navigate({ to: "/admin/login", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create the admin account.");
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
            <h1 className="display-md mt-5">A private key, made yours.</h1>
            <p className="body-editorial mt-6 text-ondark/65">
              Set the first password for the Cineshotss studio account. Your password is sent directly to the
              authentication service and is never stored in this website.
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
              <p className="body-editorial mt-10">Checking setup availability…</p>
            ) : available ? (
              <>
                <h2 className="display-md mt-8">Set your password</h2>
                <p className="body-editorial mt-4">
                  Choose a strong password of at least 8 characters for the private admin account.
                </p>
                <p className="mt-5 border border-border bg-background p-4 text-sm">
                  Admin email: <strong>{adminEmail}</strong>
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <label className="block">
                    <span className="eyebrow mb-2 block text-muted-foreground">Password</span>
                    <input
                      required
                      minLength={8}
                      maxLength={128}
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
                      maxLength={128}
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="form-input-lux"
                    />
                  </label>

                  <Button type="submit" disabled={busy} className="btn-solid-lux h-auto w-full rounded-none">
                    {busy ? "Creating account…" : "Create admin account"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h2 className="display-md mt-8">Setup complete</h2>
                <p className="body-editorial mt-4">
                  The initial admin account has already been created. Sign in to manage the gallery.
                </p>
                <Link to="/admin/login" className="btn-solid-lux mt-10 inline-flex px-8 py-4">
                  Go to sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}