import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Email } from "../assets/email.svg";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import { ReactComponent as User } from "../assets/user.svg";
import { Link } from "react-router-dom";
import { checkUsername, register } from "../redux/actions/auth";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import Swal from "sweetalert2";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
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

  const [errUsername, setErrUsername] = useState(null);
  const [errEmail, setErrEmail] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [errPasswdVal, setErrPasswdVal] = useState(null);

  const isAvailable = useSelector((state) => state.auth.isAvailable);
  const [checkLoad, setCheckLoad] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(register(username, email, password, passwordValidate))
      .then(() => {
        Swal.fire({
          title: "Registered successfully",
          text: "Check your email for verification",
          icon: "success",
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordValidate("");
        setLoading(false);
      })
      .catch(() => {
        Toast.fire({
          icon: "warning",
          title: "The given data was invalid",
        });
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleRegister();
    }
  };

  useEffect(() => {
    setCheckLoad(true);
    dispatch(checkUsername(username)).then(() => setCheckLoad(false));
    if (username != "") {
      if (/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
        if (isAvailable) {
          setErrUsername(null);
        } else {
          setErrUsername("Username already taken");
        }
      } else {
        setErrUsername("Username must be between 4-16 characters and only contain uppercase, lowercase, number, underscore, hyphen");
      }
    }
  }, [username, isAvailable]);

  useEffect(() => {
    if (email != "") {
      if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
        setErrEmail(null);
      } else {
        setErrEmail("Invalid email address");
      }
    }
  }, [email]);

  useEffect(() => {
    if (password != "") {
      if (password.length >= 8) {
        setErrPassword(null);
      } else {
        setErrPassword("Password must has at least 8 characters");
      }
    }
  }, [password]);

  useEffect(() => {
    if (passwordValidate == password) {
      setErrPasswdVal(null);
    } else {
      setErrPasswdVal("Invalid confirm password");
    }
  }, [passwordValidate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-biruTua px-4 py-12">
      <div className="w-80 h-112 md:w-96 md:h-128 lg:w-112 lg:h-144 rounded-xl px-2 md:px-4 lg:px-8 py-14 bg-abuMuda">
        <form>
          <div className="mx-4 grid">
            <p className="text-black text-base md:text-lg lg:text-xl font-bold place-self-center">Create your account</p>
            <AuthField
              placeholder={"Username"}
              value={username}
              onChange={(username) => setUsername(username)}
              icon={<User />}
              error={errUsername}
              loading={checkLoad}
            />
            {errUsername && <p className="text-red-500 text-sm">{errUsername}</p>}
            <AuthField placeholder={"Email"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} type={"email"} error={errEmail} />
            {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
            <AuthField
              placeholder={"Password"}
              value={password}
              onChange={(pass) => setPassword(pass)}
              icon={isReveal ? <EyeOff /> : <Eye />}
              type={isReveal ? "password" : "text"}
              onClick={toggle}
              error={errPassword}
            />
            {errPassword && <p className="text-red-500 text-sm">{errPassword}</p>}
            <AuthField
              placeholder={"Confirm Password"}
              value={passwordValidate}
              onChange={(pass) => setPasswordValidate(pass)}
              icon={isRevealConf ? <EyeOff /> : <Eye />}
              type={isRevealConf ? "password" : "text"}
              onClick={toggleConf}
              onKeyPress={handleKeyPress}
              error={errPasswdVal}
            />
            {errPasswdVal && <p className="text-red-500 text-sm">{errPasswdVal}</p>}
            <div className="grid mt-14">
              <div className="flex justify-center w-full">
                <AuthButton text={"Sign up"} loading={loading} onClick={handleRegister} />
              </div>
              <div className="flex place-self-center mt-2">
                <p className="text-black text-xs md:text-sm lg:text-base">Already have an account?</p>
                <Link to="/login">
                  <p className="text-biru text-xs md:text-sm lg:text-base hover:text-biruTua">Sign in</p>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
