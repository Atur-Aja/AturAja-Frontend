import React, { useState } from "react";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import Logo from "../assets/logo.svg";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";

export default function NewPassword() {
  const [isReveal, setIsReveal] = useState(true);
  const [isRevealConf, setIsRevealConf] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const toggle = () => {
    setIsReveal(!isReveal);
  };
  const toggleConf = () => {
    setIsRevealConf(!isRevealConf);
  };
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
          <p className="text-black text-lg font-bold place-self-center">Create New Password</p>
          <AuthField
            placeholder={"Password"}
            value={password}
            onChange={(pass) => setPassword(pass)}
            icon={isReveal ? <EyeOff /> : <Eye />}
            type={isReveal ? "password" : "text"}
            onClick={toggle}
          />
          <AuthField
            placeholder={"Confirm Password"}
            value={passwordValidate}
            onChange={(pass) => setPasswordValidate(pass)}
            icon={isRevealConf ? <EyeOff /> : <Eye />}
            type={isRevealConf ? "password" : "text"}
            onClick={toggleConf}
          />
          <AuthButton text={"Reset"} />
        </div>
      </div>
    </div>
  );
}
