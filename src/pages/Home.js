import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateButton from "../components/Modal/CreateButton";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import TaskCard from "../components/Cards/taskCard";
import ScheduleCard from "../components/Cards/scheduleCard";
import { getScheduleByDate } from "../redux/actions/schedule";
import { getTaskByDate } from "../redux/actions/task";
import TaskModal from "../components/Modal/TaskModal";
import ScheduleModal from "../components/Modal/ScheduleModal";
import moment from "moment";
import myCustomLocale from "../helpers/calendarConf";
import { IconSchedule } from "../components/Icons";
import { IconTask } from "../components/Icons";
import { clearSearch } from "../redux/actions/friend";
import axios from "axios";
import { Url } from "../helpers/server";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HomePage({ show, onClose, isToday }) {
  const schedules = useSelector((state) => state.schedule.results);
  const tasks = useSelector((state) => state.task.results.tasks);

  const today = utils().getToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [nativeDate, setNativeDate] = useState("");
  const [nativeDay, setNativeDay] = useState("");
  const day = days[myCustomLocale.toNativeDate(selectedDay).getDay()];
  const date = myCustomLocale.toNativeDate(selectedDay).getDate();
  const selectedDate = selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day;

  const [loadSchedule, setLoadSchedule] = useState(false);
  const [loadTask, setLoadTask] = useState(false);

  let history = useHistory();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(Url.Dashboard + "/cek").then((resp) => {
      if (resp.data == false) {
        Toast.fire({
          icon: "info",
          title: "Please fill your profile data",
        });
        history.push("/setup-profile");
      }
    });

    setLoadSchedule(true);
    setLoadTask(true);
    dispatch(getScheduleByDate(selectedDate)).then(() => setLoadSchedule(false));
    dispatch(getTaskByDate(selectedDate)).then(() => setLoadTask(false));
  }, [dispatch, selectedDate]);

  useEffect(() => {
    setLoadSchedule(true);
    setLoadTask(true);
    if (isToday) {
      setSelectedDay(today);
    }
    setNativeDate(date);
    setNativeDay(day);
    dispatch(getScheduleByDate(selectedDate)).then(() => setLoadSchedule(false));
    dispatch(getTaskByDate(selectedDate)).then(() => setLoadTask(false));
  }, [dispatch, date, day, selectedDate, selectedDay, isToday]);

  const [taskModal, setTaskModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const showTask = () => setTaskModal(true);
  const showSchedule = () => setScheduleModal(true);
  const closeTask = () => {
    dispatch(clearSearch());
    setTaskModal(false);
    setLoadTask(true);
    dispatch(getTaskByDate(selectedDate)).then(() => setLoadTask(false));
  };
  const closeSchedule = () => {
    dispatch(clearSearch());
    setScheduleModal(false);
    setLoadSchedule(true);
    dispatch(getScheduleByDate(selectedDate)).then(() => setLoadSchedule(false));
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
    <div className="h-screen w-screen">
      <CreateButton onClose={onClose} show={show} taskModal={showTask} scheduleModal={showSchedule} />
      <TaskModal onClose={closeTask} show={taskModal} task={task} />
      <ScheduleModal onClose={closeSchedule} show={scheduleModal} schedule={schedule} />
      <div className="h-full -mt-14 flex">
        <div className="w-1/3 lg:w-2/5 py-16 px-4 overflow-y-auto">
          <div className="fixed bg-abuMuda w-12 pt-4 px-6">
            <p className="font-semibold text-xl">Schedule</p>
          </div>
          {loadSchedule ? (
            <div className="h-full w-full flex flex-wrap content-center justify-center">
              <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
              <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
              <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
              <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
            </div>
          ) : (
            (schedules?.length &&
              schedules.map((list) => {
                return (
                  <div key={list.schedule.id} onClick={() => handleListSchedule(list)}>
                    <div className="grid grid-cols-1 gap-1 pt-10 mx-4" />
                    <ScheduleCard
                      title={list.schedule.title}
                      startTime={moment(list.schedule.start_time, "HH:mm:ss").format("LT")}
                      endTime={moment(list.schedule.end_time, "HH:mm:ss").format("LT")}
                      date={moment(list.schedule.date).format("ll")}
                      location={list.schedule.location}
                      member={list?.member || []}
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
            )
          )}
        </div>
        <div className="w-1/3 lg:w-2/5 py-16 px-4 border-l border-black border-opacity-10 overflow-y-auto">
          <div className="fixed bg-abuMuda w-12 pt-4 px-6">
            <p className="font-semibold text-xl mb-4">Task</p>
          </div>
          {loadTask ? (
            <div className="h-full w-full flex flex-wrap content-center justify-center">
              <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
              <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
              <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
              <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
            </div>
          ) : (
            (tasks?.length &&
              tasks.map((task) => {
                return (
                  <div key={task.task.id} onClick={() => handleListTask(task)}>
                    <div className="grid grid-cols-1 gap-1 pt-10 mx-4" />
                    <TaskCard
                      id={task.task.id}
                      status={task.task.status}
                      priority={task.task.priority}
                      title={task.task.title}
                      time={moment(task.task.time, "HH:mm:ss").format("LT")}
                      todo={task?.todo || []}
                      member={task?.member || []}
                    />
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
            )
          )}
        </div>
        <div className="w-72 md:w-96 lg:w-1/3 py-20 px-4 md:px-24 bg-abu">
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
