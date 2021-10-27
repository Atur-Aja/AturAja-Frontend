import React, { useEffect, useState } from "react";
import { getAllSchedule } from "../actions/schedule";
import { useDispatch, useSelector } from "react-redux";
import ScheduleCard from "../components/Cards/scheduleCard";
import moment from "moment";

export default function Schedule() {
  const schedules = useSelector((state) => state.schedule.results);
  const dispatch = useDispatch();

  const handleDateMap = (schedules) => {
    const dateMap = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    schedules.forEach((data) => {
      if (!dateMap.includes(data.start_date)) {
        dateMap.push(data.start_date);
      }

      if (!dateMap.includes(data.end_date)) {
        dateMap.push(data.end_date);
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
          const sDate = new Date(data.start_date);
          const eDate = new Date(data.end_date);

          return selDate >= sDate && selDate <= eDate;
        });

        const StringDate = selDate.getFullYear() + "-" + (selDate.getMonth() + 1) + "-" + selDate.getDate();

        dateGrouped[StringDate] = filteredData;
      });

      const groupedScheduleCopy = [];
      Object.keys(dateGrouped).map((key) => {
        const currentArray = dateGrouped[key];
        groupedScheduleCopy.push({
          date: key,
          data: currentArray,
        });
      });
      setGroupedSchedule(groupedScheduleCopy);
    }
  }, [schedules]);

  return (
    <div className="px-4 pt-4">
      {groupedSchedule
        ? groupedSchedule.map((schedule) => {
            return (
              <div key={schedule.date} className="mb-16">
                <p className="text-lg font-semibold">
                  {moment(schedule.date).calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd, DD MMMM YYYY",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "dddd, DD MMMM YYYY",
                  })}
                </p>
                <div className="border-t border-black" />
                {schedule.data.map((list) => {
                  return (
                    <ScheduleCard
                      title={list.title}
                      startTime={moment(list.start_time, "HH:mm:ss").format("LT")}
                      endTime={moment(list.end_time, "HH:mm:ss").format("LT")}
                      location={list.location}
                    />
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
}
