import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreateButton from '../components/Modal/CreateButton';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";

const myCustomLocale = {
  // months list by order
  months: [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Monday',
      short: 'Mo',
    },
    {
      name: 'Tuesday',
      short: 'Tu',
    },
    {
      name: 'Wednesday',
      short: 'We',
    },
    {
      name: 'Thursday',
      short: 'Th',
    },
    {
      name: 'Friday',
      short: 'Fr',
    },
    {
      name: 'Saturday',
      short: 'Sa',
    },
    {
      name: 'Sunday', // used for accessibility 
      short: 'Su', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',

  // for input range value
  from: 'from',
  to: 'to',


  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
}

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function HomePage ({ show, onClose }) {
	const today = utils().getToday();
	const [selectedDay, setSelectedDay] = useState(today);
  const [nativeDate, setNativeDate] = useState('');
  const [nativeDay, setNativeDay] = useState('');
  const day = days[myCustomLocale.toNativeDate(selectedDay).getDay()];
  const date = myCustomLocale.toNativeDate(selectedDay).getDate();

	useEffect(() => {
		setNativeDate(date);
    setNativeDay(day);
	})

  return (
		<div className='grid'>
			<CreateButton onClose={onClose} show={show}/>
			<div className='h-screen -mt-14 flex bg-abu'>
				<div className='w-2/5 pt-16 px-16 bg-abuMuda'>
					haiiiii
				</div>
				<div className='w-2/5 pt-16 px-16 border-l border-black border-opacity-10 bg-abuMuda'>
					halooooo
				</div>
				<div className='my-16 ml-6 pt-12'>
					<div className='flex'>
						<p className='text-5xl mr-2'>{nativeDate}</p>
						<p className='text-3xl pb-1 self-end'>{nativeDay}</p>
					</div>
					<Calendar
						value={selectedDay}
						onChange={setSelectedDay}
						locale={myCustomLocale}
						colorPrimary="#10C2D3"
						shouldHighlightWeekends
					/>
				</div> 
			</div>
		</div>
	);
}