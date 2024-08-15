"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CredentialsForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  console.log(session);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/home");
    } else {
      console.log("Error: ", signInResponse);
      setError("Email o Contraseña incorrecta!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/4 max-w-sm">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <div className="flex justify-between items-center mb-10">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="h-4 w-4" />
          <span className="text-gray-400">Recordar contraseña</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-[#FCA51D] block text-right"
        >
          Recuperar
        </Link>
      </div>

      <button
        type="submit"
        className="bg-[#FCA51D] text-black py-2 px-4 rounded w-full mb-4"
        onClick={(event) => (window.location.href = "/home")}
      >
        Entrar
      </button>
    </form>
  );
}
