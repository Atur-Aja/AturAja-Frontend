import React from 'react';

export default function Task () {
    return (
        <div className='w-124 mx-12 overflow rounded-lg shadow-lg biru bg-white'>
            <div className='flex justify-between ml-8 mt-8 '>
                <div>
                    <p className='font-mulish text-3xl font-semibold text-black bg-clip-text text-gray-900'>Project IMK</p>
                </div>
                <div>
                    <p className='mt-2 font-mulish text-xl font-extrabold text-black bg-clip-text text-gray-900'>8:00 AM</p>
                </div>
                <div className='mt-2 mr-8 bg-gray-100 border-2 rounded-md border-gray-500 w-10 h-10 flex flex-wrap content-center justify-end'>
                    <input type="checkbox" id="A3-yes" name="A3-confirmation" value="yes" class="opacity-0 absolute h-8 w-8" />
                </div>
            </div>
            <div className='h-2 w-20 ml-8 rounded-full py-3 px-6 bg-red-500 font-mulish text-sm font-bold grid place-content-center'>
                <p className='bg-clip-text text-white'>Urgent</p>
            </div>
            <div className='ml-8 mt-8 font-mulish text-base font-semibold'>
                <p className='text-gray-500'>Todo</p>
            </div>
            <div className='flex ml-8 mt-4 mb-12'>
                <div class='bg-gray-100 border-2 rounded-md border-gray-500 w-8 h-8'>
                    <input type="checkbox" id="A3-yes" name="A3-confirmation" value="yes" class="opacity-0 absolute h-8 w-8" />
                <p className='ml-12 font-mulish text-xl font-semibold text-gray-900'>Tasksub</p>
                </div>
            </div>
        </div>
    )
}