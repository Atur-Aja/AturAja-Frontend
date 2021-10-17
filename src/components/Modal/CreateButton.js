import React from "react";

export default function CreateButton ({ onClose, show }) {
  if(!show) return null;

  return(
    <div className='fixed z-50 top-0 bottom-0 left-0 right-0 grid self-start pt-14 pr-16' onClick={onClose}>
      <div className='w-40 h-20 py-3 shadow-xl rounded-md justify-self-end bg-white' onClick={e => e.stopPropagation()}>
        <p className='px-2 hover:bg-abuMuda cursor-pointer'>new task</p>
        <p className='px-2 mt-2 hover:bg-abuMuda cursor-pointer'>new schedule</p>
      </div>
    </div>
  )
}