import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

export default function Navbar () {
  return (
    <div className='flex justify-between px-16 py-2 bg-gradient-to-r from-biru to-ijo'>
      <div className='flex flex-wrap content-center'>
        <img src={Logo} className='shadow-2xl' alt='logo'/>
        <p className='text-white font-comforta font-semibold flex flex-wrap content-center ml-2 text-2xl'>atur aja</p>
      </div>
      <div className='flex flex-wrap content-center text-white font-mulish'>
        <div className='flex flex-wrap content-center'>
          <Link to='/'>
            <p className='font-semibold text-lg mx-4 hover:text-gray-400'>Fitur</p>
          </Link>
          <Link to='/'>
            <p className='font-semibold text-lg mx-4 hover:text-gray-400'>Download</p>
          </Link>
          <Link to='/'>
            <p className='font-semibold text-lg mx-4 hover:text-gray-400'>Bantuan</p>
          </Link>
        </div>
        <div className='flex flex-wrap content-center'>
          <Link to='/login'>
            <button className='bg-biru hover:bg-biruTua px-8 py-2 rounded-full ml-4 mr-2 shadow-2xl'>Login</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-white hover:bg-gray-400 px-8 py-2 rounded-full text-gray-600 ml-2 shadow-2xl'>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}