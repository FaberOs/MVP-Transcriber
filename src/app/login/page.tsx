import React from "react";
import Link from "next/link";
import LogoComplete from "@/components/Icons/LogoComplete";
import FavIcon from "@/components/Icons/FavIcon";

import CredentialsForm from "@/components/Layout/CredentialsForm";
import { GoogleSignInButton } from "@/components/Common/AuthButtons";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sección izquierda */}
      <div className="w-1/2 bg-[#313131] flex justify-center items-center">
        <LogoComplete />
      </div>

      {/* Sección derecha */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <FavIcon height="50" />
        <h2 className="text-2xl my-8 ">Iniciar sesión</h2>

        <CredentialsForm />
        <GoogleSignInButton />

        <span className="mt-10 text-gray-400 text-sm">
          ¿No tienes una cuenta todavía?{" "}
          <Link href="/register" className="text-[#FCA51D]">
            Regístrate aquí
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
