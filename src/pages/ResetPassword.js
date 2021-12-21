import React, { useState } from "react";
import { ReactComponent as Email } from "../assets/email.svg";
import Logo from "../assets/logo.svg";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import axios from "axios";
import { Url } from "../helpers/server";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleRequest = () => {
    setLoading(true);
    axios.post(Url.Password + "/email", { email }).then((resp) => {
      if (resp.status == 200) {
        Swal.fire({
          title: "Reset Password Success",
          text: "Check your email to create new password",
          icon: "success",
        });
        setLoading(false);
      } else {
        Toast.fire({
          icon: "error",
          title: "Email unregistered",
        });
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-biruTua">
      <div className="w-80 h-112 md:w-96 md:h-128 lg:w-112 lg:h-144 rounded-xl px-2 md:px-4 lg:px-8 py-14 bg-abuMuda">
        <div className="flex flex-wrap content-center justify-center">
          <img src={Logo} className="w-16 md:w-20 lg:w-24" alt="logo" />
          <div className="ml-4 font-comforta text-2xl md:text-3xl lg:text-4xl font-semibold grid place-content-center">
            <p className="bg-clip-text text-transparent bg-gradient-to-tr from-ijo to-biru">
              atur
              <br />
              aja
            </p>
          </div>
        </div>
        <div className="mt-8 mx-4 grid">
          <p className="text-black text-base md:text-lg lg:text-xl font-bold place-self-center">Reset Password</p>
          <p className="text-gray-600 text-xs md:text-sm lg:text-base place-self-center text-center">Enter an email address you use to sign in to.</p>
          <AuthField placeholder={"Email"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} type={"email"} />
          <AuthButton text={"Reset"} loading={loading} onClick={handleRequest} />
        </div>
      </div>
    </div>
  );
}
