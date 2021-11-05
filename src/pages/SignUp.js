import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Email } from "../assets/email.svg";
import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import { ReactComponent as User } from "../assets/user.svg";
import { Link } from "react-router-dom";
import { register } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";

export default function SignUp() {
  const [isReveal, setIsReveal] = useState(true);
  const [isRevealConf, setIsRevealConf] = useState(true);
  const toggle = () => {
    setIsReveal(!isReveal);
  };
  const toggleConf = () => {
    setIsRevealConf(!isRevealConf);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    dispatch(register(username, email, password, passwordValidate))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="h-screen flex justify-center bg-biruTua pt-24">
      <div className="w-112 h-144 rounded-xl px-8 py-14 bg-abuMuda">
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
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
