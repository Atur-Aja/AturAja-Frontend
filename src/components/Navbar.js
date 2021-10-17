import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { IconMenu } from './Icons';

export default function Navbar ({ toggle, toggleCreate }) {
  return (
    <div className='flex justify-between pr-16 pl-4 py-2 bg-biruTua sticky top-0 z-40 shadow-xl'>
      <div className='flex flex-wrap content-center text-white'>
        <IconMenu onClick={toggle}/>
        <img src={Logo} className='shadow-2xl ml-6' alt='logo'/>
        <p className='font-comforta font-semibold flex flex-wrap content-center ml-2 text-2xl'>atur aja</p>
      </div>
      <div className='flex flex-wrap content-center text-white font-mulish'>
        <p className='cursor-pointer' onClick={toggleCreate}>+ Create</p>
        
        {/* <div className='flex flex-wrap content-center'>
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
        </div> */}
      </div>
    </div>
  );
}