import React, { useEffect, useState } from "react";
import { getAllSchedule } from "../redux/actions/schedule";
import { useDispatch, useSelector } from "react-redux";
import ScheduleCard from "../components/Cards/scheduleCard";
import moment from "moment";
import { IconSchedule } from "../components/Icons";
import ScheduleModal from "../components/Modal/ScheduleModal";
import { clearSearch } from "../redux/actions/friend";

export default function Schedule({ show, onClose }) {
  const schedules = useSelector((state) => state.schedule.results.schedules);
  const dispatch = useDispatch();

  const handleDateMap = (schedules) => {
    const dateMap = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    schedules.forEach((data) => {
      if (!dateMap.includes(data.schedule.start_date)) {
        dateMap.push(data.schedule.start_date);
      }

      if (!dateMap.includes(data.schedule.end_date)) {
        dateMap.push(data.schedule.end_date);
      }
    });

    dateMap.sort();
    const dateMapFiltered = dateMap.filter((data) => new Date(data) > today);

    return dateMapFiltered;
  };

  const dateMapFormatted = [];
  const [groupedSchedule, setGroupedSchedule] = useState([]);

  useEffect(() => {
    dispatch(getAllSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (schedules?.length > 0) {
      const dateGrouped = {};
      const dateMap = handleDateMap(schedules);

      const dates = { start: dateMap[0], end: dateMap[dateMap.length - 1] };
      dates.start = new Date(dates.start);
      dates.end = new Date(dates.end);
      for (let currentDate = dates.start.getTime(); currentDate <= dates.end.getTime(); currentDate += 86400000) {
        dateMapFormatted.push(new Date(currentDate));
      }

      dateMapFormatted.sort((a, b) => a - b);
      dateMapFormatted.forEach((selDate) => {
        const filteredData = schedules.filter((data) => {
          const sDate = new Date(data.schedule.start_date);
          const eDate = new Date(data.schedule.end_date);

          return selDate >= sDate && selDate <= eDate;
        });

        const StringDate = selDate.getFullYear() + "-" + (selDate.getMonth() + 1) + "-" + selDate.getDate();

        dateGrouped[StringDate] = filteredData;
      });

      const groupedScheduleCopy = [];
      Object.keys(dateGrouped).map((key) => {
        const currentArray = dateGrouped[key];
        if (currentArray.length > 0) {
          groupedScheduleCopy.push({
            date: key,
            data: currentArray,
          });
        }
      });
      setGroupedSchedule(groupedScheduleCopy);
    }
  }, [schedules]);

  const [schedule, setSchedule] = useState({});
  const handleListSchedule = (schedule) => {
    setSchedule(schedule);
  };
  const closeSchedule = (e) => {
    dispatch(clearSearch());
    dispatch(getAllSchedule());
    onClose && onClose(e);
  };

  return (
    <div className="h-screen px-4 pt-4">
      <ScheduleModal onClose={closeSchedule} show={show} schedule={schedule} />
      {(groupedSchedule?.length &&
        groupedSchedule.map((list) => {
          return (
            <div key={list.date} className="mb-16">
              <p className="text-lg font-semibold">
                {moment(list.date).calendar(null, {
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
                {list.data.map((list) => {
                  return (
                    <div onClick={() => handleListSchedule(list)}>
                      <ScheduleCard
                        title={list.schedule.title}
                        startTime={moment(list.schedule.start_time, "HH:mm:ss").format("LT")}
                        endTime={moment(list.schedule.end_time, "HH:mm:ss").format("LT")}
                        location={list.schedule.location}
                        member={list?.member || []}
                      />
                    </div>
                  );
                })}
              </div>
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
  );
}
