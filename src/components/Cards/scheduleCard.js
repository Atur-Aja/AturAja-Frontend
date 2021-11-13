import React from "react";
import { IconSchedule, IconLocation, IconClock, IconGroup } from "../Icons";
import girl from "../../assets/girl.jpg";

export default function ScheduleCard({ title, startTime, endTime, startDate, endDate, location }) {
  const data = ["a", "b", "a", "b", "a", "b"];
  const index = [30, 20, 10];
  const dataSliced = data.slice(0, 3);
  const newData = dataSliced.map((value) => {
    return { image: value };
  });
  newData.forEach((element, i) => {
    element.index = index[i];
  });

  return (
    <div className="bg-white shadow-lg rounded-md px-4 py-2 mt-4 cursor-pointer">
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
      <div className="flex text-biruTua mt-3">
        <IconGroup />
        <div className="flex ml-2">
          {(newData?.length &&
            newData.map((list) => {
              return (
                <div className="flex">
                  <div className={`w-8 h-8 rounded-full absolute border-2 border-white bg-gray-400 z-` + list.index}>
                    <img
                      className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                      src={girl}
                      alt="Profile"
                    />
                  </div>
                  <div className="w-5" />
                </div>
              );
            })) ||
            null}
          {(data.length > 3 && (
            <div className="w-8 h-8 z-0 rounded-full border-2 border-white bg-gray-300 flex flex-wrap content-center justify-center">
              <p className="text-xs font-bold">+{data.length - 3}</p>
            </div>
          )) ||
            null}
        </div>
      </div>
    </div>
  );
}
