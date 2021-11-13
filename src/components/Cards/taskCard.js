import React from "react";
import girl from "../../assets/girl.jpg";

export default function TaskCard({ title, time, todo }) {
  const data = ["a", "b", "c", "b", "a", "b"];
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
      {(todo?.length && <p className="text-xs text-gray-500">Todo :</p>) || null}
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
      <div className="flex mt-2">
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
  );
}
