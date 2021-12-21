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
  const [loadSchedules, setLoadSchedules] = useState(false);
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
    setLoadSchedules(true);
    dispatch(getAllSchedule()).then(() => setLoadSchedules(false));
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
    <div className="min-h-screen">
      <ScheduleModal onClose={closeSchedule} show={show} schedule={schedule} />
      <div className="fixed bg-abuMuda w-full pt-4 px-6 md:px-14">
        <p className="font-semibold text-lg md:text-xl">Schedule</p>
      </div>
      {loadSchedules ? (
        <div className="min-h-screen items-center flex flex-wrap content-center justify-center">
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
        </div>
      ) : (
        (groupedSchedule?.length &&
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 pt-10 px-4 md:px-12">
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
        <div className="min-h-screen items-center flex flex-wrap content-center justify-center grid">
          <div className="md:hidden w-24 h-24 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
            <IconSchedule width={"60"} height={"60"} />
          </div>
          <p className="md:hidden text-base md:text-lg lg:text-xl justify-self-center font-semibold">No Schedule</p>
          <p className="md:hidden text-xs md:text-sm lg:text-base text-center justify-self-center">you can add schedule by clicking “create” button</p>
          <div className="invisible md:visible md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
            <IconSchedule width={"112"} height={"112"} />
          </div>
          <p className="invisible md:visible text-base md:text-xl lg:text-2xl justify-self-center font-semibold">No Schedule</p>
          <p className="invisible md:visible text-xs md:text-base lg:text-lg text-center justify-self-center">you can add schedule by clicking “create” button</p>
        </div>
        )
      )}
    </div>
  );
}