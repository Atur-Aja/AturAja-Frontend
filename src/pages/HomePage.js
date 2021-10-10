import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/auth';
import Sidebar from '../components/Sidebar';
import Plus from '../assets/plus.svg';

export default function HomePage () {
  const dispatch = useDispatch();

	const {user: currentUser} = useSelector(state => state.auth)
  if (!currentUser) {
    return <Redirect to='/login'/>;
  }

	const logOut = () => {
		dispatch(logout());
	};

  return (
			<div className='h-screen flex bg-abuMuda'>
				<Sidebar />
				<button onClick={logOut}>logout</button>
				<div className='h-132 w-144 my-16 mx-30 bg-white rounded-lg border-solid border-4 border-biru'>
					<div className='h-12 w-32 ml-4 mt-4 bg-white rounded-lg border-solid border-4 border-biru font-mulish text-2xl font-black grid place-content-center'>
						<p className='bg-clip-text text-biru'>Task</p>
					</div>
					<p className='font-mulish text-black text-xl font-extralight'> No Task</p>
					<div className='flex flex-wrap content-center justify-end'>
						<div class='rounded-full h-12 w-12 flex items-center justify-center bg-biru'>
							<img src={Plus} alt='plus'/>
						</div>
					</div>
				</div>
				<div className='h-132 w-96 my-16 bg-white rounded-lg border-solid border-4 border-opacity-50 border-biru'>
					<div className='h-12 w-32 ml-4 mt-4 bg-white rounded-lg border-solid border-4 border-biru font-mulish text-2xl font-black grid place-content-center'>
						<p className='bg-clip-text text-biru'>Schedule</p>
					</div>   
					<p className='font-mulish text-black text-xl font-extralight'> No Schedule</p>
					<div class='rounded-full h-12 w-12 flex items-center justify-center bg-biru'>
						<img src={Plus} alt='plus'/>
					</div>
				</div>   
			</div>
	);
}