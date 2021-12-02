import React from 'react';
import Meeting from '../assets/meeting.jpg';

export default function LandingPage () {
  return (
    <div className='bg-abuMuda h-screen'>
      <div className='h-full -mt-14 flex'>
        <img src={Meeting} className='w-1/2 self-center' alt='people meeting'/>
        <div className='flex flex-wrap content-center text-abuTua'>
          <div>
            <p className='font-bold text-5xl'>Welcome</p>
            <p>Bingung cari jadwal ? AturAja!</p>
          </div>
        </div>
      </div>
    </div>
  );
}