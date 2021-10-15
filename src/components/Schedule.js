import React from 'react';
import {ReactComponent as Calendar} from '../assets/calendar.svg';
import {ReactComponent as Location} from '../assets/location.svg';

export default function Schedule () {
    return (
        <div className='w-124 mx-12 overflow rounded-lg shadow-lg bg-white'>
            <div className='ml-8 mt-8 font-mulish text-3xl font-semibold text-black'>
                <p className='bg-clip-text text-gray-900'>Kuliah IMK</p>
            </div>
            <div class='flex ml-12 mt-4'>
                <Calendar />
                <p className='ml-8 font-mulish text-lg font-regular text-gray-900'>8:00 AM - 10:00 AM</p>
            </div>
            <div class='flex ml-12 mt-4'>
                <Location />
                <p className='ml-8 mb-8 font-mulish text-lg font-regular text-gray-900'>https://meet.google.com/jza-hcwe-ekk</p>
            </div>
        </div>
    )
}