import React from 'react';
import Navbar from '../components/Navbar';
import Meeting from '../assets/meeting.jpg';

export default function LandingPage () {
  return (
    <div className='bg-abuMuda h-screen'>
      <Navbar />
      <div className='px-16 mt-28 flex bg-abuMuda'>
        <img src={Meeting} className='w-1/2' alt='people meeting'/>
        <div className='w-1/2 flex flex-wrap content-center text-abu'>
          <div>
            <p className='font-bold text-5xl'>Welcome</p>
            <p>Bingung mencari jadwal bersama ? AturAja!</p>
          </div>
        </div>
      </div>
    </div>
  );
}