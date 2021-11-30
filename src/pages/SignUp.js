import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Email } from "../assets/email.svg";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import { ReactComponent as User } from "../assets/user.svg";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/auth";
import { clearMessage } from "../redux/actions/message";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import Swal from "sweetalert2";

export default function SignUp() {
  const [isReveal, setIsReveal] = useState(true);
  const [isRevealConf, setIsRevealConf] = useState(true);
  const toggle = () => {
    setIsReveal(!isReveal);
  };
  const toggleConf = () => {
    setIsRevealConf(!isRevealConf);
  };

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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, passwordValidate))
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Registered successfully",
        });
      })
      .catch(() => {
        Toast.fire({
          icon: "warning",
          title: "The given data was invalid",
        });
      });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleRegister();
    }
  };

  return (
    <div className="h-screen flex justify-center bg-biruTua pt-24">
      <div className="w-112 h-144 rounded-xl px-8 py-14 bg-abuMuda">
        <form>
          <div className="mx-4 grid">
            <p className="text-black text-lg font-bold place-self-center">Create your account</p>
            <AuthField placeholder={"Username"} value={username} onChange={(username) => setUsername(username)} icon={<User />} />
            <AuthField placeholder={"Email"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} type={"email"} />
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
              onKeyPress={handleKeyPress}
            />
            <div className="grid mt-14">
              <div className="flex justify-center">
                <Link to="/login">
                  <AuthButton text={"Sign up"} onClick={handleRegister} />
                </Link>
              </div>
              <div className="flex place-self-center mt-2">
                <p className="text-black text-xs">Already have an account?</p>
                <Link to="/login">
                  <p className="text-biru text-xs hover:text-biruTua">Sign in</p>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
