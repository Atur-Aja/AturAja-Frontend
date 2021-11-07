import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateButton from "../components/Modal/CreateButton";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import TaskCard from "../components/Cards/taskCard";
import ScheduleCard from "../components/Cards/scheduleCard";
import { getScheduleByDate } from "../actions/schedule";
import { getTaskByDate } from "../actions/task";
import TaskModal from "../components/Modal/TaskModal";
import ScheduleModal from "../components/Modal/ScheduleModal";
import moment from "moment";
import myCustomLocale from "../helpers/calendarConf";
import { IconSchedule } from "../components/Icons";
import { IconTask } from "../components/Icons";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HomePage({ show, onClose }) {
  const schedules = useSelector((state) => state.schedule.results);
  const tasks = useSelector((state) => state.task.results.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScheduleByDate(selectedDate));
    dispatch(getTaskByDate(selectedDate));
  }, [dispatch]);

  const today = utils().getToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [nativeDate, setNativeDate] = useState("");
  const [nativeDay, setNativeDay] = useState("");
  const day = days[myCustomLocale.toNativeDate(selectedDay).getDay()];
  const date = myCustomLocale.toNativeDate(selectedDay).getDate();
  const selectedDate = selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day;

  useEffect(() => {
    setNativeDate(date);
    setNativeDay(day);
    dispatch(getScheduleByDate(selectedDate));
    dispatch(getTaskByDate(selectedDate));
  }, [selectedDay]);

  const [taskModal, setTaskModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const showTask = () => setTaskModal(true);
  const showSchedule = () => setScheduleModal(true);
  const closeTask = () => {
    setTaskModal(false);
    dispatch(getTaskByDate(selectedDate));
  };
  const closeSchedule = () => {
    setScheduleModal(false);
    dispatch(getScheduleByDate(selectedDate));
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
            })) || (
            <div className="h-full w-full flex flex-wrap content-center justify-center grid">
              <div className="w-40 h-40 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
                <IconSchedule width={"80"} height={"80"} />
              </div>
              <p className="text-xl justify-self-center font-semibold">No Schedule</p>
              <p className="justify-self-center">you can add schedule by clicking “create” button</p>
            </div>
          )}
        </div>
        <div className="w-2/5 py-16 px-4 border-l border-black border-opacity-10 overflow-y-auto">
          <p className="font-semibold text-xl">Tasks</p>
          {(tasks?.length &&
            tasks.map((task) => {
              return (
                <div key={task.task.id} onClick={() => handleListTask(task)}>
                  <TaskCard title={task.task.title} time={moment(task.task.time, "HH:mm:ss").format("LT")} todo={task?.todo || []} />
                </div>
              );
            })) || (
            <div className="h-full w-full flex flex-wrap content-center justify-center grid">
              <div className="w-40 h-40 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
                <IconTask width={"80"} height={"80"} />
              </div>
              <p className="text-xl justify-self-center font-semibold">No Task</p>
              <p className="justify-self-center">you can add task by clicking “create” button</p>
            </div>
          )}
        </div>
        <div className="w-1/5 py-20 px-4 bg-abu">
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
