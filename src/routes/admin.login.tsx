import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/integrations/supabase/client";
import { signInWithPassword, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Cineshotss" },
      { name: "description", content: "Sign in to manage the Cineshotss gallery." },
      { property: "og:title", content: "Admin Login | Cineshotss" },
      { property: "og:description", content: "Sign in to manage the Cineshotss gallery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (!auth.loading && auth.admin) {
      void navigate({ to: "/admin", replace: true });
    }
  }, [auth.admin, auth.loading, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);

    try {
      await signInWithPassword(email.trim(), password);
      toast.success("Signed in");
      await navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to complete that request");
    } finally {
      setBusy(false);
    }
  }

  async function handleResetRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send reset email");
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
            <h1 className="display-md mt-5">The gallery, carefully curated.</h1>
            <p className="body-editorial mt-6 text-ondark/65">
              Sign in to add photographs, shape each collection and decide what guests get to see.
            </p>
          </div>
          <p className="text-xs text-ondark/45">{BRAND.statement}</p>
        </div>

        <div className="flex items-center bg-ivory px-6 py-16 text-foreground md:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <Link to="/" className="eyebrow text-muted-foreground">
              ← Back to {BRAND.name}
            </Link>
            <h2 className="display-md mt-8">
              Welcome back
            </h2>
            <p className="body-editorial mt-4">
              Enter your studio credentials to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <label className="block">
                <span className="eyebrow mb-2 block text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-input-lux"
                />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block text-muted-foreground">Password</span>
                <input
                  required
                  minLength={6}
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-input-lux"
                />
              </label>

              <Button type="submit" disabled={busy} className="btn-solid-lux h-auto w-full rounded-none">
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}