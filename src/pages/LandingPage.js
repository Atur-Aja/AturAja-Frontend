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
import Meeting from "../assets/meeting.jpg";

export default function LandingPage() {

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
    <div className="bg-abuMuda flex flex-col md:flex-row items-center justify-center my-8 md:my-10 md:mx-4 lg:mx-6 xl:mx-8">
      <div className="w-full md:w-1/2 flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap content-center text-abuTua md:self-center text-center">
          <p className="text-base md:text-lg lg:text-2xl xl:text-3xl xl:mx-4">Create a collaboration schedule without struggle</p>
          <img src={Meeting} className="w-full py-2 md:pt-6 lg:pt-8 self-center" alt="people meeting" />
          <p className="text-xs md:text-lg xl:text-xl">
            Atur Aja is a scheduling and to do list application that features schedule recommendations, collaboration with friends and focus mode (on mobile).
          </p>
          <p>Button buat download Mobile</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-60 h-96 md:w-72 md:h-112 lg:w-96 lg:h-144 xl:w-112 rounded-xl px-2 md:px-4 lg:px-6 py-4 xl:py-16 shadow-2xl bg-abuMuda">
          <div className="flex flex-wrap content-center justify-center">
            <img src={Logo} className="w-14 md:w-16 lg:w-20" alt="logo" />
            <div className="ml-4 font-comforta text-xl md:text-2xl lg:text-3xl font-semibold grid place-content-center">
              <p className="bg-clip-text text-transparent bg-gradient-to-tr from-ijo to-biru">
                atur
                <br />
                aja
              </p>
            </div>
          </div>
          <form>
            <div className="mt-8 mx-2">
              <AuthField placeholder={"Email / username"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} />
              <AuthField
                placeholder={"Password"}
                value={password}
                onChange={(pass) => setPassword(pass)}
                icon={isReveal ? <EyeOff /> : <Eye />}
                type={isReveal ? "password" : "text"}
                onClick={toggle}
                onKeyPress={handleKeyPress}
              />
              <div className="mt-2 flex justify-end text-gray-600 text-xs md:text-sm lg:text-base xl:text-lg hover:text-biru">
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
                <p className="text-black text-xs md:text-sm lg:text-base xl:text-lg">Don't have an account?</p>
                <Link to="/signup">
                  <p className="text-biru text-xs md:text-sm lg:text-base xl:text-lg hover:text-biruTua">Sign Up</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
