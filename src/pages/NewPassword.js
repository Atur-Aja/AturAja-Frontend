import React, { useState } from "react";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import Logo from "../assets/logo.svg";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import axios from "axios";
import { Url } from "../helpers/server";
import Swal from "sweetalert2";
import { useLocation, useHistory } from "react-router-dom";

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
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

  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const email = new URLSearchParams(search).get("email");

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

  let history = useHistory();
  const handleRequest = () => {
    setLoading(true);
    axios.post(Url.Password + "/reset", { email, password, password_confirmation: passwordValidate, token }).then((resp) => {
      if (resp.status == 200) {
        Swal.fire({
          text: "Create New Password Success",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "back to login",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/login");
          }
        });
        setLoading(false);
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-biruTua px-4 py-12">
      <div className="w-80 h-112 md:w-96 md:h-128 rounded-xl px-2 md:px-4 py-14 bg-abuMuda">
        <div className="flex flex-wrap content-center justify-center">
          <img src={Logo} className="w-16 md:w-20" alt="logo" />
          <div className="ml-4 font-comforta text-2xl md:text-3xl font-semibold grid place-content-center">
            <p className="bg-clip-text text-transparent bg-gradient-to-tr from-ijo to-biru">
              atur
              <br />
              aja
            </p>
          </div>
        </div>
        <div className="mt-8 mx-4 grid">
          <p className="text-black text-base md:text-lg font-bold place-self-center text-center">Create New Password</p>
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
          <AuthButton text={"Reset"} loading={loading} onClick={handleRequest} />
        </div>
      </div>
    </div>
  );
}
