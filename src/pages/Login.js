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
import Swal from "sweetalert2";

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

    dispatch(login(email, password))
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        history.push("/home");
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
        <form>
          <div className="mt-8 mx-4">
            <AuthField placeholder={"Email"} value={email} onChange={(email) => setEmail(email)} icon={<Email />} />
            <AuthField
              placeholder={"Password"}
              value={password}
              onChange={(pass) => setPassword(pass)}
              icon={isReveal ? <EyeOff /> : <Eye />}
              type={isReveal ? "password" : "text"}
              onClick={toggle}
              onKeyPress={handleKeyPress}
            />
            <div className="mt-2 flex justify-end text-gray-600 text-sm hover:text-biru">
              <Link to="/reset">
                <p>Forgot Password?</p>
              </Link>
            </div>
          </div>
          <div className="grid mt-24">
            <div className="flex justify-center w-full">
              <AuthButton text={"Sign in"} loading={loading} onClick={handleLogin} />
            </div>
            <div className="flex place-self-center mt-2">
              <p className="text-black text-xs">Don't have an account?</p>
              <Link to="/signup">
                <p className="text-biru text-xs hover:text-biruTua">Sign Up</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
