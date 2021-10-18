import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSchedule } from "../../actions/schedule";
import { InputField, SelectField } from "../Commons/FormField";
import { SaveButton, CancelButton } from "../Commons/LinkButton";

export default function ScheduleModal ({ onClose, show}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start_date, setStartDate] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [repeat, setRepeat] = useState('');
  const [notification, setNotification] = useState('');

  const repeatOptions = [
    {
      label: 'choose repetition'
    },
    {
      label: 'Daily',
      value: 'daily'
    },
    {
      label: 'Once',
      value: 'once'
    },
    {
      label: 'Mon to Fri',
      value: 'mon to fri'
    },
  ];

  const notificationOptions = [
    {
      label: 'choose notification'
    },
    {
      label: '10 minutes',
      value: '10 minutes'
    },
    {
      label: '5 minutes',
      value: '5 minutes'
    },
    {
      label: '30 minutes',
      value: '30 minutes'
    },
  ];

  const dispatch = useDispatch();
  const handleAddSchedule = (e) => {
    e.preventDefault();
    dispatch(createSchedule(title, description, location, start_date, start_time, end_time, repeat, notification));
  }

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  // console.log('title = ', title);
  // console.log('description = ', description);
  // console.log('location = ', location);
  // console.log('start_date = ', start_date);
  // console.log('start_time = ', start_time);
  // console.log('end_time = ', end_time);
  // console.log('repeat = ', repeat);
  // console.log('notification = ', notification);
  
  if(!show) return null;

  return(
    <div className='fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center' onClick={onClose}>
      <div className='w-2/5 py-3 px-6 shadow-xl rounded-md justify-self-end bg-white' onClick={e => e.stopPropagation()}>
        <p className='font-bold text-2xl text-center'>New Schedule</p>
        <div className='flex mt-3'>
          <div className='w-1/2 ml-2 mr-8'>
            <InputField label={'Title'} placeholder={'Enter title here'} onChange={title => setTitle(title)} value={title} />
            <InputField label={'Description'} placeholder={'Enter description'} onChange={description => setDescription(description)} value={description} />
            <InputField label={'Location'} placeholder={'Enter location'} onChange={location => setLocation(location)} value={location} />
          </div>
          <div className='w-1/2 mr-2 ml-8'>
            <InputField label={'Date'} onChange={date => setStartDate(date)} value={start_date} type={'date'} />
            <div className='mt-2'>
              <p className='font-semibold'>Time</p>
              <label for="start">From: </label>
              <input type="time" name="start" value={start_time} className='border rounded-lg text-sm px-2 py-1' onChange={onChangeStartTime}/>
              <label for="start" className='ml-3'>To: </label>
              <input type="time" name="start" value={end_time} className='border rounded-lg text-sm px-2 py-1' onChange={onChangeEndTime}/>
            </div>
            <SelectField label={'Repeat'} options={repeatOptions} value={repeat} onChange={repeat => setRepeat(repeat)} />
            <SelectField label={'Notification'} options={notificationOptions} value={notification} onChange={notification => setNotification(notification)} />
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <CancelButton onClick={onClose}/>
          <SaveButton onClick={handleAddSchedule}/>
        </div>
      </div>
    </div>
  )
}