import React, { useEffect, useState } from "react";
import { getAllTask } from "../redux/actions/task";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/Cards/taskCard";
import moment from "moment";
import { IconTask } from "../components/Icons";
import TaskModal from "../components/Modal/TaskModal";
import { clearSearch } from "../redux/actions/friend";

export default function Task({ onClose, show }) {
  const tasks = useSelector((state) => state.task.results.tasks);
  const [loadTasks, setLoadTasks] = useState(false);
  const dispatch = useDispatch();

  const handleDateMap = (tasks) => {
    const dateMap = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach((data) => {
      if (!dateMap.includes(data.task.date)) {
        dateMap.push(data.task.date);
      }
    });

    dateMap.sort();
    const dateMapFiltered = dateMap.filter((data) => new Date(data) > today);

    return dateMapFiltered;
  };

  const dateMapFormatted = [];
  const [groupedTask, setGroupedTask] = useState([]);

  useEffect(() => {
    setLoadTasks(true);
    dispatch(getAllTask()).then(() => setLoadTasks(false));
  }, [dispatch]);

  useEffect(() => {
    if (tasks?.length > 0) {
      const dateGrouped = {};
      const dateMap = handleDateMap(tasks);

      dateMap.forEach((data) => {
        dateMapFormatted.push(new Date(data));
      });

      dateMapFormatted.forEach((selDate) => {
        const filteredData = tasks.filter((data) => {
          const date = new Date(data.task.date);
          const dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          const selDateFormat = selDate.getFullYear() + "-" + (selDate.getMonth() + 1) + "-" + selDate.getDate();

          return selDateFormat === dateFormat;
        });
        const StringDate = selDate.getFullYear() + "-" + (selDate.getMonth() + 1) + "-" + selDate.getDate();
        dateGrouped[StringDate] = filteredData;
      });

      const groupedTaskCopy = [];
      Object.keys(dateGrouped).map((key) => {
        const currentArray = dateGrouped[key];
        if (currentArray.length > 0) {
          groupedTaskCopy.push({
            date: key,
            data: currentArray,
          });
        }
      });
      const sortedData = [];
      groupedTaskCopy.map((item) => {
        const newData = item.data.sort((a, b) => (a.task.priority < b.task.priority ? 1 : -1));
        sortedData.push({
          date: item.date,
          data: newData,
        });
      });
      setGroupedTask(sortedData);
    }
  }, [tasks]);

  const [task, setTask] = useState({});
  const [taskModal, setTaskModal] = useState(false);
  const handleListTask = (task) => {
    setTask(task);
    setTaskModal(true);
  };
  const closeTask = () => {
    dispatch(clearSearch());
    dispatch(getAllTask());
    setTaskModal(false);
    onClose && onClose();
  };

  return (
    <div className="min-h-screen">
      <TaskModal onClose={closeTask} show={show} task={task} />
      <div className="fixed bg-abuMuda w-full pt-4 px-6 md:px-14">
        <p className="font-semibold text-lg md:text-xl">Task</p>
      </div>
      {loadTasks ? (
        <div className="min-h-screen items-center flex flex-wrap content-center justify-center">
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
        </div>
      ) : (
        (groupedTask?.length &&
          groupedTask.map((task) => {
            return (
              <div key={task.date} className="mb-16">
                <p className="text-lg font-semibold">
                  {moment(task.date).calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd, DD MMMM YYYY",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "dddd, DD MMMM YYYY",
                  })}
                </p>
                <div className="border-t border-black" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 pt-10 px-4 md:px-12">
                  {task.data.map((list) => {
                    return (
                      <div key={list.task.id} onClick={() => handleListTask(list)}>
                        <TaskCard
                          id={list.task.id}
                          status={list.task.status}
                          description={list.task.description}
                          priority={list.task.priority}
                          title={list.task.title}
                          time={moment(list.task.time, "HH:mm:ss").format("LT")}
                          todo={list?.todo || []}
                          member={list?.member || []}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })) || (
          <div className="min-h-screen items-center flex flex-wrap content-center justify-center grid">
            <div className="md:hidden w-24 h-24 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
              <IconTask width={"60"} height={"60"} />
            </div>
            <p className="md:hidden text-base md:text-lg lg:text-xl justify-self-center font-semibold">No Task</p>
            <p className="md:hidden text-xs md:text-sm lg:text-base text-center justify-self-center">you can add task by clicking “create” button</p>
            <div className="invisible md:visible md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
              <IconTask width={"112"} height={"112"} />
            </div>
            <p className="invisible md:visible text-base md:text-xl lg:text-2xl justify-self-center font-semibold">No Task</p>
            <p className="invisible md:visible text-xs md:text-base lg:text-lg text-center justify-self-center">you can add task by clicking “create” button</p>
          </div>
        )
      )}
    </div>
  );
}
          