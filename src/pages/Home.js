import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateButton from "../components/Modal/CreateButton";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import TaskCard from "../components/Cards/taskCard";
import ScheduleCard from "../components/Cards/scheduleCard";
import { getAllSchedule } from "../actions/schedule";
import { getAllTask } from "../actions/task";
import TaskModal from "../components/Modal/TaskModal";
import ScheduleModal from "../components/Modal/ScheduleModal";
import moment from "moment";

const myCustomLocale = {
  // months list by order
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

  // week days by order
  weekDays: [
    {
      name: "Monday",
      short: "Mo",
    },
    {
      name: "Tuesday",
      short: "Tu",
    },
    {
      name: "Wednesday",
      short: "We",
    },
    {
      name: "Thursday",
      short: "Th",
    },
    {
      name: "Friday",
      short: "Fr",
    },
    {
      name: "Saturday",
      short: "Sa",
    },
    {
      name: "Sunday", // used for accessibility
      short: "Su", // displayed at the top of days' rows
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
  nextMonth: "Next Month",
  previousMonth: "Previous Month",
  openMonthSelector: "Open Month Selector",
  openYearSelector: "Open Year Selector",
  closeMonthSelector: "Close Month Selector",
  closeYearSelector: "Close Year Selector",
  defaultPlaceholder: "Select...",

  // for input range value
  from: "from",
  to: "to",

  // used for input value when multi dates are selected
  digitSeparator: ",",

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HomePage({ show, onClose }) {
  const schedules = useSelector((state) => state.schedule.results);
  const tasks = useSelector((state) => state.task.results.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSchedule());
    dispatch(getAllTask());
  }, [dispatch]);

  const today = utils().getToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [nativeDate, setNativeDate] = useState("");
  const [nativeDay, setNativeDay] = useState("");
  const day = days[myCustomLocale.toNativeDate(selectedDay).getDay()];
  const date = myCustomLocale.toNativeDate(selectedDay).getDate();

  useEffect(() => {
    setNativeDate(date);
    setNativeDay(day);
  });

  const [taskModal, setTaskModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const showTask = () => setTaskModal(true);
  const showSchedule = () => setScheduleModal(true);
  const closeTask = () => {
    setTaskModal(false);
    dispatch(getAllTask());
  };
  const closeSchedule = () => {
    setScheduleModal(false);
    dispatch(getAllSchedule());
  };

  const [schedule, setSchedule] = useState({});
  const [task, setTask] = useState({});
  const handleListSchedule = (schedule) => {
    setSchedule(schedule);
    setScheduleModal(true);
  };
  const handleListTask = (task) => {
    setTask(task);
    setTaskModal(true);
  };

  return (
    <div className="h-screen">
      <CreateButton onClose={onClose} show={show} taskModal={showTask} scheduleModal={showSchedule} />
      <TaskModal onClose={closeTask} show={taskModal} task={task} />
      <ScheduleModal onClose={closeSchedule} show={scheduleModal} schedule={schedule} />
      <div className="h-full -mt-14 flex">
        <div className="w-2/5 py-16 px-4 overflow-y-auto">
          <p className="font-semibold text-xl">Schedule</p>
          {(schedules?.length &&
            schedules.map((schedule) => {
              return (
                <div key={schedule.id} onClick={() => handleListSchedule(schedule)}>
                  <ScheduleCard
                    title={schedule.title}
                    startTime={moment(schedule.start_time, "HH:mm:ss").format("LT")}
                    endTime={moment(schedule.end_time, "HH:mm:ss").format("LT")}
                    startDate={moment(schedule.start_date).format("ll")}
                    endDate={moment(schedule.end_date).format("ll")}
                    location={schedule.location}
                  />
                </div>
              );
            })) ||
            null}
        </div>
        <div className="w-2/5 py-16 px-4 border-l border-black border-opacity-10 overflow-y-auto">
          <p className="font-semibold text-xl">Tasks</p>
          {tasks?.length &&
            tasks.map((task) => {
              return (
                <div key={task.task.id} onClick={() => handleListTask(task)}>
                  <TaskCard title={task.task.title} time={moment(task.task.time, "HH:mm:ss").format("LT")} todo={task?.todo || []} />
                </div>
              );
            })}
        </div>
        <div className="ml-6 py-20 px-4 bg-abu">
          <div className="flex">
            <p className="text-5xl mr-2">{nativeDate}</p>
            <p className="text-3xl pb-1 self-end">{nativeDay}</p>
          </div>
          <Calendar value={selectedDay} onChange={setSelectedDay} locale={myCustomLocale} colorPrimary="#10C2D3" shouldHighlightWeekends />
        </div>
      </div>
    </div>
  );
}
