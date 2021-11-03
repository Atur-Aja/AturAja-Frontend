import React from "react";

export default function TaskCard({ title, time, todo }) {
  return (
    <div className="bg-white shadow-lg rounded-md px-4 py-2 mt-4 cursor-pointer">
      <div className="flex justify-between">
        <p className="font-semibold w-1/2">{title}</p>
        <div className="w-1/2 flex justify-between">
          <p className="font-bold text-biruTua">{time}</p>
          <input
            type="checkbox"
            className="w-8 h-8 cursor-pointer border border-gray-500 rounded-md bg-abuMuda appearance-none checked:bg-biruTua checked:border-transparent"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <p className="text-xs text-gray-500">Todo :</p>
      {(todo?.length &&
        todo.map((data, i) => (
          <div className="flex mt-1">
            <input
              key={i}
              type="checkbox"
              className="w-6 h-7 mx-2 cursor-pointer border border-gray-500 rounded-md bg-abuMuda appearance-none checked:bg-biruTua checked:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
            <p onClick={(e) => e.stopPropagation()}>{data.name}</p>
          </div>
        ))) ||
        null}
    </div>
  );
}
