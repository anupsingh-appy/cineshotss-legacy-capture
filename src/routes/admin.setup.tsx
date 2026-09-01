import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { getInitialAdminSetupStatus, sendInitialAdminInvite } from "@/lib/admin-setup.functions";

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
  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
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
    setBusy(true);
    try {
      const result = await sendInitialAdminInvite();
      if (!result.created) {
        setAvailable(false);
        toast.error("Initial admin setup is already closed.");
        return;
      }

      setAvailable(false);
      toast.success("A secure setup link was sent to the admin email.");
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
                <h2 className="display-md mt-8">Secure account setup</h2>
                <p className="body-editorial mt-4">
                  We’ll send a one-time setup link to the designated admin email. Use that link to choose your
                  password without sharing it with this website or anyone else.
                </p>
                <p className="mt-5 border border-border bg-background p-4 text-sm">
                  Admin email: <strong>{adminEmail}</strong>
                </p>

                <form onSubmit={handleSubmit} className="mt-10">
                  <Button type="submit" disabled={busy} className="btn-solid-lux h-auto w-full rounded-none">
                    {busy ? "Sending secure link…" : "Send secure setup link"}
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