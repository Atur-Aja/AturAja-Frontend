import React from 'react';

export default function Schedule () {
  return(
    <div className='border border-biru rounded-lg px-2 py-1 grid'>
      <p className='justify-self-center font-semibold text-lg'>Kuliah Imk</p>
      <div className='flex'>
        <div className='w-1/4 pr-2 grid place-items-end font-semibold'>
          <p>Time:</p>
          <p>Date:</p>
          <p>Location:</p>
        </div>
        <div className='w-3/4'>
          <p>08:00 AM - 10:00 AM</p>
          <p>Monday, 18 October 2021</p>
          <p>https://meet.google.com</p>
        </div>
      </div>
    </div>
  );
}