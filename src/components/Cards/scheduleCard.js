import React, { useState, useEffect } from "react";
import { IconSchedule, IconLocation, IconClock, IconGroup } from "../Icons";

export default function ScheduleCard({ title, startTime, endTime, date, location, member }) {
  const image = member.map((e) => e.photo);
  const [friend, setFriend] = useState(image);
  const index = [30, 20, 10];
  const friendSliced = friend.slice(0, 3);
  const newData = friendSliced.map((value) => {
    return { image: value };
  });
  newData.forEach((element, i) => {
    element.index = index[i];
  });

  useEffect(() => {
    setFriend(newData);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-md px-4 py-2 mt-4 h-48 cursor-pointer">
      <p className="font-semibold">{title}</p>
      {date ? (
        <div className="flex text-biruTua mt-3">
          <IconSchedule />
          <p className="text-black ml-3">{date}</p>
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
        <div className="flex ml-2 relative">
          {(friend.length > 1 &&
            friend.map((list) => {
              return (
                <div className="flex">
                  <div className={`w-8 h-8 rounded-full absolute border-2 border-white bg-gray-400 z-` + list.index}>
                    {(list.image && (
                      <img
                        className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                        src={`https://api.aturaja.me/api/user/image/${list.image}`}
                        alt="Profile"
                      />
                    )) ||
                      null}
                  </div>
                  <div className="w-5" />
                </div>
              );
            })) ||
            null}
          {(image.length > 3 && (
            <div className="w-8 h-8 z-0 rounded-full ml-1 border-2 border-white bg-gray-300 flex flex-wrap content-center justify-center">
              <p className="text-xs font-bold">+{image.length - 3}</p>
            </div>
          )) || <p className="ml-1">-</p>}
        </div>
      </div>
    </div>
  );
}
