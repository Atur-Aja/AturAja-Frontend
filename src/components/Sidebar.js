import React from 'react';
//import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import Home from '../assets/home.svg';
import Calendar from '../assets/calendar.svg';
import List from '../assets/list.svg';
import Task from '../assets/task.svg';
import Friend from '../assets/friends.svg';
import Group from '../assets/group.svg';
import Setting from '../assets/setting.svg';


export default function Sidebar () {
  return (
      <div class='min-h-screen flex'>
          <div class='bg-gradient-to-r from-biru to-ijo w-49'>
              <div className='flex-col justify-center'>
                <img src={Logo} className='shadow-2xl' alt='logo'/>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={Home} alt='home'/>
                </div>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={Calendar} alt='calender'/>
                </div>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={List} alt='list'/>
                </div>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={Task} alt='task'/>
                </div>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={Friend} alt='friend'/>
                </div>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={Group} alt='group'/>
                </div>
                <div class='rounded-full h-10 w-10 flex items-center justify-center bg-white'>
                    <img src={Setting} alt='setting'/>
                </div>
              </div>
          </div> 
      </div>
  );
}