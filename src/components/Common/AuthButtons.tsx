"use client";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <button
      type="button"
      className="bg-red-white text-gray-400 border border-gray-300 py-2 px-4 rounded"
      onClick={handleClick}
    >
      Iniciar sesión con Google
    </button>
  );
}
