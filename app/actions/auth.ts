"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function handleSignOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch {
    // Fallback to clearing cookie directly if session is already invalid
  }

  const cookieStore = await cookies();
  cookieStore.delete("better-auth.session_token");

  redirect("/login");
}