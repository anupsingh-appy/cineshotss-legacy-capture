# Plan: Password Reset Flow for Cineshotss Admin

## Goal
Let the admin reset a forgotten password securely using email, with no public signup and no changes to the existing public website design.

## What will be built

### 1. "Forgot password?" link on the admin login page
- Add a subtle "Forgot password?" link below the Sign In button on `/admin/login`.
- Clicking it shows a small inline form: enter your admin email → "Send reset link".
- On submit, calls the backend password-reset email with the redirect set to `/reset-password`.
- Always shows a neutral success message ("If an account exists for that email, a reset link has been sent") so it can't be used to check which emails are registered.

### 2. New `/reset-password` page (public route)
- Branded to match the admin login (same Cineshotss admin look).
- Detects the recovery link from the reset email (checks for `type=recovery` in the URL).
- Shows a form: New password + Confirm password.
- Validates: minimum length, both fields match.
- On submit, updates the password and redirects to `/admin/login` with a success message.
- If the link is missing or expired, shows a clear message with a link back to the login page.

### 3. Emails
- Reset emails will use the default Lovable Cloud auth email (no custom domain needed).
- Link in the email lands on `/reset-password`.

### 4. Verification
- Typecheck and build pass.
- Browser check: `/reset-password` renders, login page shows the forgot-password link, and an expired/missing token shows the friendly error state.

## Technical details
- Files touched:
  - `src/routes/admin.login.tsx` — add forgot-password mode using `supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + "/reset-password" })`.
  - `src/routes/reset-password.tsx` — new public route; parses the recovery session from the URL hash, calls `supabase.auth.updateUser({ password })` (no `current_password` — recovery sessions are exempt).
- No database, table, bucket, or RLS changes needed.
- No new routes exposed to the public site navigation; both pages are admin-only entry points.
- Existing public website, galleries, and admin dashboard remain untouched.
