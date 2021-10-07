import React, { useState } from "react";
import {ReactComponent as Email} from '../assets/email.svg';
import {ReactComponent as Eye} from '../assets/eye.svg';
import {ReactComponent as EyeOff} from '../assets/eye-off.svg';
import Logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

export default function Login () {
  const [isReveal, setIsReveal] = useState(true)
  const toggle = () => {
    setIsReveal(!isReveal);
  }
  return (
    <div className='h-screen flex justify-center bg-gradient-to-br from-ijo to-blue-500 pt-24'>
      <div className='w-112 h-144 rounded-xl px-8 py-14 bg-abuMuda'>
        <div className='flex flex-wrap content-center justify-center'>
          <img src={Logo} className='w-24' alt='logo'/>
          <div className='ml-4 font-comforta text-2xl font-semibold grid place-content-center'>
            <p className='bg-clip-text text-transparent bg-gradient-to-tr from-ijo to-biru'>atur<br/>aja</p>
          </div>
        </div>
        <div className='mt-8 mx-4'>
          <div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type='email' placeholder='Email'/>
            <div className='flex flex-wrap content-center'>
              <Email />
            </div>
          </div>
          <div className='bg-white shadow-xl h-12 px-4 rounded-lg flex border-2 border-transparent text-gray-600 focus-within:border-biru focus-within:text-biru mt-8'>
            <input className='w-11/12 h-full rounded-lg outline-none placeholder-gray-600 text-gray-600' type={isReveal ? 'password' : 'text'} placeholder='Password'/>
            <div className='flex flex-wrap content-center cursor-pointer' onClick={toggle}>
              {isReveal ? <EyeOff /> : <Eye />}
            </div>
          </div>
          <div className='mt-2 flex justify-end text-gray-600 text-sm hover:text-biru'>
            <Link to='/reset'>
              <p>Forgot Password?</p>
            </Link>
          </div>
        </div>
        <div className='grid mt-24'>
          <div className='flex justify-center'>
            <Link to='/homepage'>
              <button className='bg-biru hover:bg-biruTua rounded-lg shadow-xl text-white font-bold px-20 py-2 place-self-center'>Sign in</button>
            </Link>
          </div>
          <div className='flex place-self-center mt-2'>
            <p className='text-black text-xs'>Don't have an account?</p>
            <Link to='/signup'>
              <p className='text-biru text-xs hover:text-biruTua'>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}