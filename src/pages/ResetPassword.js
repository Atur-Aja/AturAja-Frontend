import React, { useState } from "react";
import { ReactComponent as Email } from "../assets/email.svg";
import Logo from "../assets/logo.svg";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="h-screen flex justify-center bg-biruTua pt-24">
      <div className="w-112 h-144 rounded-xl px-8 py-14 bg-abuMuda">
        <div className="flex flex-wrap content-center justify-center">
          <img src={Logo} className="w-24" alt="logo" />
          <div className="ml-4 font-comforta text-2xl font-semibold grid place-content-center">
            <p className="bg-clip-text text-transparent bg-gradient-to-tr from-ijo to-biru">
              atur
              <br />
              aja
            </p>
          </div>
        </div>
        <div className="mt-8 mx-4 grid">
          <p className="text-black text-lg font-bold place-self-center">Reset Password</p>
          <p className="text-gray-600 text-sm place-self-center">Enter an email address you use to sign in to.</p>
          <AuthField placeholder={"Email"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} type={"email"} />
          <AuthButton text={"Reset"} />
        </div>
      </div>
    </div>
  );
}
