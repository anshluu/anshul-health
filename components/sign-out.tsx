"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-blue-400 hover:text-stone-200 transition-all"
      onClick={() => signOut()}
    >
      sign out
    </button>
  );
}
