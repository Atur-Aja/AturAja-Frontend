import React, { useEffect, useState } from "react";
import { getAllSchedule } from "../redux/actions/schedule";
import { useDispatch, useSelector } from "react-redux";
import ScheduleCard from "../components/Cards/scheduleCard";
import moment from "moment";
import { IconSchedule } from "../components/Icons";
import ScheduleModal from "../components/Modal/ScheduleModal";
import { clearSearch } from "../redux/actions/friend";
import { toggleCreate } from "../redux/actions/bar";

export default function Schedule() {
  const schedules = useSelector((state) => state.schedule.results.schedules);
  const isCreate = useSelector((state) => state.bar.create);
  const isSidebar = useSelector((state) => state.bar.sidebar);
  const [loadSchedules, setLoadSchedules] = useState(false);
  const dispatch = useDispatch();

  const handleDateMap = (schedules) => {
    const dateMap = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    schedules.forEach((data) => {
      if (!dateMap.includes(data.schedule.date)) {
        dateMap.push(data.schedule.date);
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
          const date = new Date(data.schedule.date);
          return selDate.getTime() == date.getTime();
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
  const [scheduleModal, setScheduleModal] = useState(false);
  const handleListSchedule = (schedule) => {
    setSchedule(schedule);
    setScheduleModal(true);
  };
  const closeSchedule = () => {
    dispatch(clearSearch());
    dispatch(getAllSchedule());
    setScheduleModal(false);
    dispatch(toggleCreate(false));
  };

  return (
    <div className={"h-screen px-4 pt-4 transition-all ease-in-out duration-200 " + (isSidebar ? "lg:ml-60" : "lg:ml-14")}>
      <ScheduleModal onClose={closeSchedule} show={scheduleModal || isCreate} schedule={schedule} />
      {loadSchedules ? (
        <div className="h-full w-full flex flex-wrap content-center justify-center">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
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
            <p className="justify-self-center text-center">you can add schedule by clicking “create” button</p>
          </div>
        )
      )}
    </div>
  );
}
