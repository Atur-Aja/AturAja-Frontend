import React, { useEffect, useState } from "react";
import { IconCheck } from "../Icons";
import Swal from "sweetalert2";
import axios from "axios";
import { Url } from "../../helpers/server";
import { baseUrl } from "../../helpers/config";

export default function TaskCard({ id, status, description, priority, title, time, todo, member }) {
  const image = member.map((e) => e.photo);
  const [friend, setFriend] = useState(image);
  const [mark, setMark] = useState("");
  const [allStatus, setAllStatus] = useState(status);
  const [todoStatus, setTodoStatus] = useState(todo);
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

    if (priority == 1) setMark("!");
    else if (priority == 2) setMark("!!");
    else if (priority == 3) setMark("!!!");
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleMarkAllStatus = (e) => {
    e.stopPropagation();
    setAllStatus(!allStatus);

    axios
      .put(Url.Task + `/${id}`, {
        status: !allStatus,
        friends: member.map((data) => data.id),
      })
      .then((resp) => {
        if (resp.status == 200) {
          Toast.fire({
            icon: "success",
            title: "task checked successfully",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "try again",
          });
        }
      });

    const status = [...todoStatus];
    status.map((data, idx) => {
      status[idx].status = !allStatus;
      setTodoStatus(status);

      axios.put(Url.Todo + `/${data.id}`, {
        status: status[idx].status,
      });
    });
  };

  const handleMarkTodo = (e, data, idx) => {
    e.stopPropagation();
    const status = [...todoStatus];
    status[idx].status = !status[idx].status;
    setTodoStatus(status);

    axios
      .put(Url.Todo + `/${data.id}`, {
        status: status[idx].status,
      })
      .then((resp) => {
        if (resp.status == 200) {
          Toast.fire({
            icon: "success",
            title: "task checked successfully",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "try again",
          });
        }
      });

    if (allStatus) {
      setAllStatus(false);
    }
  };

  useEffect(() => {
    const checked = todoStatus.filter((data) => data.status == true);
    if (todoStatus.length == checked.length) {
      setAllStatus(true);
    }
  }, [todoStatus]);

  useEffect(() => {
    setAllStatus(status);
    const checked = todoStatus.filter((data) => data.status == true);
    if (todoStatus.length != checked.length) {
      setAllStatus(false);
    }
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-md px-4 py-2 mt-4 h-48 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex w-1/2">
          {mark != "" ? <p className="font-bold mr-3 text-red-500">{mark}</p> : null}
          <p className="font-semibold">{title}</p>
        </div>
        <div className="w-1/2 flex justify-between">
          <p className="font-bold text-biruTua">{time}</p>
          <div
            className={
              `w-8 h-8 cursor-pointer border border-gray-500 rounded-md appearance-none flex justify-center text-abuMuda ` +
              (allStatus ? "bg-biruTua border-transparent" : "bg-abuMuda")
            }
            onClick={handleMarkAllStatus}
          >
            {/* <IconCheck /> */}
          </div>
        </div>
      </div>
      {(!todo.length && (
        <div className="mb-3">
          <p className="text-xs text-gray-500">Description :</p>
          {description}
        </div>
      )) ||
        null}
      {(todo?.length && <p className="text-xs text-gray-500">Todo :</p>) || <p className="text-xs text-gray-500">empty todo list</p>}
      {(todo.length > 3 &&
        todo.slice(0, 3).map((data, idx) => (
          <div className="flex mt-1" key={idx}>
            <div
              className={
                `w-6 h-6 mx-2 cursor-pointer border border-gray-500 rounded-md appearance-none flex justify-center text-abuMuda ` +
                (todoStatus[idx].status ? "bg-biruTua border-transparent" : "bg-abuMuda")
              }
              onClick={(e) => handleMarkTodo(e, data, idx)}
            >
              <IconCheck />
            </div>
            <p onClick={(e) => e.stopPropagation()}>{data.name}</p>
            {(data.update_by && (
              <div className="relative text-xs px-4 h-5 self-center rounded-full bg-gray-300 ml-4" onClick={(e) => e.stopPropagation()}>
                {data.update_by}
              </div>
            )) ||
              null}
          </div>
        ))) ||
        todo.map((data, idx) => (
          <div className="flex mt-1" key={idx}>
            <div
              className={
                `w-6 h-6 mx-2 cursor-pointer border border-gray-500 rounded-md appearance-none flex justify-center text-abuMuda ` +
                (todoStatus[idx].status ? "bg-biruTua border-transparent" : "bg-abuMuda")
              }
              onClick={(e) => handleMarkTodo(e, data, idx)}
            >
              <IconCheck />
            </div>
            <p onClick={(e) => e.stopPropagation()}>{data.name}</p>
            {(data.update_by && (
              <div className="relative text-xs px-4 h-5 self-center rounded-full bg-gray-300 ml-4" onClick={(e) => e.stopPropagation()}>
                {data.update_by}
              </div>
            )) ||
              null}
          </div>
        ))}
      <div className="flex justify-between h-10">
        {todo.length > 3 ? <p className="text-sm text-gray-500 self-center hover:underline">view {todo.length - 3} more tasks</p> : <p></p>}
        <div className="flex mt-2 relative">
          {(friend.length > 1 &&
            friend.map((list) => {
              return (
                <div className="flex">
                  <div className={`w-8 h-8 rounded-full absolute border-2 border-white bg-gray-400 z-${list.index}`}>
                    {(list.image && (
                      <img
                        className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                        src={`${baseUrl}/api/user/image/${list.image}`}
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
          )) ||
            null}
        </div>
      </div>
    </div>
  );
}
