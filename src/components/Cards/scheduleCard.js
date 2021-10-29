import React from "react";
import { IconSchedule, IconLocation, IconClock, IconEdit } from "../Icons";

export default function ScheduleCard({ title, startTime, endTime, startDate, endDate, location, onClick }) {
  return (
    <div className="bg-white shadow-lg rounded-md px-4 py-2 mt-4">
      <p className="font-semibold">{title}</p>
      {startDate ? (
        <div className="flex text-biruTua mt-3">
          <IconSchedule />
          <p className="text-black ml-3">
            {startDate} - {endDate}
          </p>
        </div>
      ) : null}
      <div className="flex text-biruTua mt-3">
        <IconClock />
        <p className="text-black ml-3">
          {startTime} - {endTime}
        </p>
      </div>
      <div className="flex text-biruTua mt-3">
        <IconLocation />
        <p className="text-black ml-3">{location}</p>
      </div>
      <div className="flex justify-end">
        <IconEdit onClick={onClick} />
      </div>
    </div>
  );
}
