import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Email } from "../assets/email.svg";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import { ReactComponent as User } from "../assets/user.svg";
import Logo from "../assets/logo.svg";
import { checkUsername, register } from "../redux/actions/auth";
import { Link, useHistory } from "react-router-dom";
import { clearMessage } from "../redux/actions/message";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import axios from "axios";
import Swal from "sweetalert2";
import { Url } from "../helpers/server";
import Meeting from "../assets/meeting.jpg";
import gplay from "../assets/google-play-img.png";

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

  const [isRegister, setIsRegister] = useState(false);
  const [isRevealConf, setIsRevealConf] = useState(true);

  const toggleConf = () => {
    setIsRevealConf(!isRevealConf);
  };

  const [username, setUsername] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");

  const [errUsername, setErrUsername] = useState(null);
  const [errEmail, setErrEmail] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [errPasswdVal, setErrPasswdVal] = useState(null);

  const isAvailable = useSelector((state) => state.auth.isAvailable);
  const [checkLoad, setCheckLoad] = useState(false);

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
    <div className="bg-abuMuda flex flex-col md:flex-row items-center justify-center my-4 md:mx-4 lg:mx-6 xl:mx-8 2xl:mx-20">
      <div className="w-full md:w-1/2 flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap content-center text-abuTua md:self-center text-center">
          <p className="text-base md:text-lg lg:text-xl xl:text-3xl 2xl:text-4xl mx-4 2xl:mx-10 text-center">Create collaborative schedule easily</p>
          <img src={Meeting} className="w-full py-2 md:pt-4 lg:pt-6 self-center" alt="people meeting" />
          <p className="text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            Atur Aja is a scheduling and to do list application that features schedule recommendations, collaboration with friends and focus mode (on
            mobile).
          </p>
        </div>
        <a href="https://play.google.com/store/apps/details?id=com.aturaja.aturaja" target="_blank">
          <img src={gplay} alt="google play" className="w-40" />
        </a>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-60 h-96 md:w-72 md:h-112 lg:w-96 lg:h-128 xl:w-112 xl:h-144 rounded-xl px-2 md:px-4 lg:px-6 py-4 shadow-2xl bg-abuMuda">
          <form>
            {isRegister ? (
              <>
                <div className="mt-1 lg:mt-6">
                  <div className="mx-2 grid">
                    <p className="text-black text-base md:text-lg lg:text-xl font-bold place-self-center">Create your account</p>
                    <AuthField
                      placeholder={"Username"}
                      value={username}
                      onChange={(username) => setUsername(username)}
                      icon={<User />}
                      error={errUsername}
                    />
                    {errUsername && <p className="text-red-500 text-sm">{errUsername}</p>}
                    <AuthField
                      placeholder={"Email"}
                      value={email}
                      onChange={(email) => setEmail(email)}
                      icon={<Email />}
                      type={"email"}
                      error={errEmail}
                    />
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
                    <div className="grid mt-4 md:mt-6 lg:mt-16">
                      <div className="flex justify-center w-full">
                        <AuthButton text={"Sign up"} loading={loading} onClick={handleRegister} />
                      </div>
                      <div className="flex place-self-center mt-2">
                        <p className="text-black text-xs md:text-sm lg:text-base xl:text-lg">Already have an account?</p>
                        <p
                          onClick={() => setIsRegister()}
                          className="cursor-pointer text-biru text-xs md:text-sm lg:text-base xl:text-lg hover:text-biruTua"
                        >
                          Sign in
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mx-2">
                <>
                  <div className="flex flex-wrap content-center justify-center">
                    <img src={Logo} className="w-14 md:w-16 lg:w-20 2xl:w-24" alt="logo" />
                    <div className="ml-4 font-comforta text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold grid place-content-center">
                      <p className="bg-clip-text text-transparent bg-gradient-to-tr from-ijo to-biru">
                        atur
                        <br />
                        aja
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-teal-200 text-teal-700 text-sm">
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
                  <>
                    <>
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
                    </>
                    <div className="mt-2 flex justify-end text-gray-600 text-xs md:text-sm lg:text-base xl:text-lg hover:text-biru">
                      <Link to="/reset">
                        <p>Forgot Password?</p>
                      </Link>
                    </div>
                    <div className="grid mt-12 md:mt-20 lg:mt-24">
                      <div className="flex justify-center">
                        <AuthButton text={"Sign in"} loading={loading} onClick={handleLogin} />
                      </div>
                      <div className="flex place-self-center mt-2">
                        <p className="text-black text-xs md:text-sm lg:text-base xl:text-lg">Don't have an account?</p>
                        <p
                          onClick={() => setIsRegister(!isRegister)}
                          className="cursor-pointer text-biru text-xs md:text-sm lg:text-base xl:text-lg hover:text-biruTua"
                        >
                          Sign Up
                        </p>
                      </div>
                    </div>
                  </>
                </>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
