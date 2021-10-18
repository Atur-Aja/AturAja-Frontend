import React from "react"
import { IconSchedule, IconLocation } from '../Icons'

export default function Schedule({title, startTime, endTime, location}) {
  return(
    <div className='bg-white shadow-lg rounded-md px-4 py-2 mt-4 cursor-pointer'>
      <p className='font-semibold'>{title}</p>
      <div className='flex text-biruTua mt-3'>
        <IconSchedule />
        <p className='text-black ml-3'>{startTime} - {endTime}</p>
      </div>
      <div className='flex text-biruTua mt-3'>
        <IconLocation />
        <p className='text-black ml-3'>{location}</p>
      </div>
    </div>
  )
}