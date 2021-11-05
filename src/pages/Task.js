import React, { useEffect, useState } from "react";
import { getAllTask } from "../actions/task";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/Cards/taskCard";
import moment from "moment";
import { IconTask } from "../components/Icons";

export default function Task() {
  const tasks = useSelector((state) => state.task.results.tasks);
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
    dispatch(getAllTask());
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
      setGroupedTask(groupedTaskCopy);
    }
  }, [tasks]);

  return (
    <div className="h-screen -mt-14 px-4 pt-4">
      {(groupedTask?.length &&
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
              <div className="grid grid-cols-3 gap-4">
                {task.data.map((list) => {
                  return <TaskCard title={list.task.title} time={moment(list.task.time, "HH:mm:ss").format("LT")} todo={list?.todo || []} />;
                })}
              </div>
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
  );
}
