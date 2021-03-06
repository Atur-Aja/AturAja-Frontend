import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Email } from "../assets/email.svg";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import Logo from "../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/auth";
import { clearMessage } from "../redux/actions/message";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import axios from "axios";
import Swal from "sweetalert2";
import { Url } from "../helpers/server";

export default function Login() {
  const [isReveal, setIsReveal] = useState(true);
  const toggle = () => {
    setIsReveal(!isReveal);
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(Url.Login, { login: email, password })
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data,
          });
          axios.get(Url.Dashboard + "/cek").then((resp) => {
            if (resp.data == true) {
              Toast.fire({
                icon: "success",
                title: "Signed in successfully",
              });
              history.push("/home");
            } else {
              Toast.fire({
                icon: "info",
                title: "Please fill your profile data",
              });
              history.push("/setup-profile");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        dispatch({
          type: "LOGIN_FAILED",
        });
        if (error.response.status == 404) {
          Toast.fire({
            icon: "warning",
            title: "Please check your email and verify before sign in",
          });
        } else if (error.response.status == 401) {
          Toast.fire({
            icon: "warning",
            title: "Invaid email/username or password",
          });
        }
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-biruTua">
      <div className="w-80 h-112 md:w-96 md:h-128 lg:w-112 lg:h-144 rounded-xl px-2 md:px-4 lg:px-8 py-4 bg-abuMuda grid">
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
        <div className="w-11/12 mt-5 px-4 py-2 rounded-lg bg-teal-200 text-teal-700 text-sm justify-self-center">
          <p className="font-semibold">Testing Credential</p>
          <div className="flex">
            <p>Username:</p>
            <p className="font-semibold ml-1">demo1</p>
          </div>
          <div className="flex">
            <p>Password:</p>
            <p className="font-semibold ml-1">Rahasia1</p>
          </div>
        </div>
        <form>
          <div className="mx-4">
            <AuthField placeholder={"Username / Email"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} />
            <AuthField
              placeholder={"Password"}
              value={password}
              onChange={(pass) => setPassword(pass)}
              icon={isReveal ? <EyeOff /> : <Eye />}
              type={isReveal ? "password" : "text"}
              onClick={toggle}
              onKeyPress={handleKeyPress}
            />
            <div className="mt-2 flex justify-end text-gray-600 text-xs md:text-sm lg:text-base hover:text-biru">
              <Link to="/reset">
                <p>Forgot Password?</p>
              </Link>
            </div>
          </div>
          <div className="grid mt-12 md:mt-20 lg:mt-24">
            <div className="flex justify-center">
              <AuthButton text={"Sign in"} loading={loading} onClick={handleLogin} />
            </div>
            <div className="flex place-self-center mt-2">
              <p className="text-black text-xs md:text-sm lg:text-base">Don't have an account?</p>
              <Link to="/signup">
                <p className="text-biru text-xs md:text-sm lg:text-base hover:text-biruTua">Sign Up</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
