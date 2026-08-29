import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/** Auth logic kept free of UI so it can be reused by a future mobile app. */

export async function signInWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${window.location.origin}/admin` },
  });
  if (error) throw error;
  return { needsConfirmation: data.session === null };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function isAdmin(userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) return false;
  return data === true;
}

export async function getAdminRole(userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return data?.role === "admin";
}

export interface AuthState {
  loading: boolean;
  session: Session | null;
  user: User | null;
  admin: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    session: null,
    user: null,
    admin: false,
  });

  useEffect(() => {
    let active = true;

    const resolve = async (session: Session | null) => {
      const admin = session?.user ? await isAdmin(session.user.id) : false;
      if (!active) return;
      setState({ loading: false, session, user: session?.user ?? null, admin });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void resolve(session);
    });

    void supabase.auth.getSession().then(({ data }) => resolve(data.session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
