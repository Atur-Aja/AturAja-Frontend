import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {ReactComponent as Email} from '../assets/email.svg';
import {ReactComponent as Eye} from '../assets/eye.svg';
import {ReactComponent as EyeOff} from '../assets/eye-off.svg';
import {ReactComponent as User} from '../assets/user.svg';
import {ReactComponent as Call} from '../assets/call.svg';
import { Link } from "react-router-dom";
import { register } from '../actions/auth';
import { clearMessage } from "../actions/message";

export default function SignUp () {
  const [isReveal, setIsReveal] = useState(true)
	const [isRevealConf, setIsRevealConf] = useState(true)
  const toggle = () => {
    setIsReveal(!isReveal);
  }
	const toggleConf = () => {
    setIsRevealConf(!isRevealConf);
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordValidate = (e) => {
    setPasswordValidate(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    dispatch(register(username, email, password, passwordValidate, phoneNumber))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      })
  };

  return (
    <div className='h-screen flex justify-center bg-biruTua pt-24'>
      <div className='w-112 h-144 rounded-xl px-8 py-14 bg-abuMuda'>
        <div className='mx-4 grid'>
          <p className='text-black text-lg font-bold place-self-center'>Create your account</p>
					<div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-6'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type='text' placeholder='Username' value={username} onChange={onChangeUsername}/>
            <div className='flex flex-wrap content-center'>
              <User />
            </div>
          </div>
					<div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-4'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type='email' placeholder='Email' value={email} onChange={onChangeEmail} />
            <div className='flex flex-wrap content-center'>
              <Email />
            </div>
          </div>
          <div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-4'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type={isReveal ? 'password' : 'text'} placeholder='Password' value={password} onChange={onChangePassword} />
            <div className='flex flex-wrap content-center cursor-pointer' onClick={toggle}>
              {isReveal ? <EyeOff /> : <Eye />}
            </div>
          </div>
					<div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-4'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type={isRevealConf ? 'password' : 'text'} placeholder='Confirm Password'  value={passwordValidate} onChange={onChangePasswordValidate}/>
            <div className='flex flex-wrap content-center cursor-pointer' onClick={toggleConf}>
              {isRevealConf ? <EyeOff /> : <Eye />}
            </div>
          </div>
					<div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-4'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type='number' placeholder='Phone Number' value={phoneNumber} onChange={onChangePhoneNumber}/>
            <div className='flex flex-wrap content-center'>
              <Call />
            </div>
          </div>
          <div className='grid mt-14'>
            <div className='flex justify-center'>
              <Link to='/login'>
						    <button className='bg-biru hover:bg-biruTua rounded-lg shadow-xl text-white font-bold px-20 py-2 place-self-center' onClick={handleRegister}>
                  Sign up
                </button>
              </Link>
            </div>
            <div className='flex place-self-center mt-2'>
							<p className='text-black text-xs'>Already have an account?</p>
							<Link to='/login'>
								<p className='text-biru text-xs hover:text-biruTua'>Sign in</p>
							</Link>
						</div>
            {message}
					</div>
        </div>
      </div>
    </div>
  );
}