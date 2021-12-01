import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFriend } from "../../redux/actions/friend";
import { createSchedule, deleteScheduleById, matchSchedule, updateScheduleById } from "../../redux/actions/schedule";
import { InputField, SelectField } from "../Commons/FormField";
import { GreenButton, WhiteButton, DeleteButton } from "../Commons/LinkButton";
import { IconSearch } from "../Icons";
import Swal from "sweetalert2";

const repeatOptions = [
  {
    label: "Weekly",
    value: "Weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "Yearly",
  },
];
const notificationOptions = [
  {
    label: "10 minutes",
    value: "10 minutes",
  },
  {
    label: "5 minutes",
    value: "5 minutes",
  },
  {
    label: "30 minutes",
    value: "30 minutes",
  },
];
var recommendationOptions = [];

export default function ScheduleModal({ onClose, show, schedule }) {
  const users = useSelector((state) => state.friend.results);
  const recommendation = useSelector((state) => state.schedule.matched);

  // console.log(recommendationOptions);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [repeat, setRepeat] = useState("");
  const [notification, setNotification] = useState("");
  const [friend, setFriend] = useState([]);
  const [name, setName] = useState("");
  const [people, setPeople] = useState([]);
  // const [recom, setRecom] = useState("");

  const dispatch = useDispatch();
  const handleAddSchedule = (e) => {
    e.preventDefault();
    dispatch(createSchedule(title, description, location, start_date, end_date, start_time, end_time, repeat, notification, friend)).then(() => {
      Swal.fire({
        text: "Your schedule has been created successfully.",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      });
      onClose();
    });
  };
  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure want to update this schedule?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#c1c1c1",
      confirmButtonText: "update",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateScheduleById(schedule.schedule.id, title, description, location, start_date, end_date, start_time, end_time, repeat, notification)
        ).then(() => {
          Swal.fire({
            title: "Updated!",
            text: "Your schedule has been updated successfully.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          onClose();
        });
      }
    });
  };
  const handleDeleteSchedule = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this schedule? This process cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c1c1c1",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteScheduleById(schedule.schedule.id)).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your schedule has been deleted successfully.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          onClose();
        });
      }
    });
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    if (schedule.schedule?.id) {
      setTitle(schedule.schedule.title);
      setDescription(schedule.schedule.description);
      setLocation(schedule.schedule.location);
      setStartDate(schedule.schedule.start_date);
      setEndDate(schedule.schedule.end_date);
      setStartTime(schedule.schedule.start_time);
      setEndTime(schedule.schedule.end_time);
      setRepeat(schedule.schedule.repeat);
      setNotification(schedule.schedule.notification);
    } else {
      setTitle("");
    }
  }, [schedule]);

  const handleSearchUser = (e) => {
    setName(e.target.value);
    dispatch(searchFriend(e.target.value));
  };

  const handleAddPeople = (username, id) => {
    if (!people.some((e) => e.username === username)) {
      setPeople([...people, { username, id }]);
      setFriend([...friend, id]);
    }
  };
  const handleDeletePeople = (id) => {
    setPeople(people.filter((e) => e.id !== id));
    setFriend(friend.filter((e) => e !== id));
  };

  useEffect(() => {
    dispatch(matchSchedule(start_date, start_time, end_time, friend));
    recommendation.rekomendasi?.length &&
      recommendation.rekomendasi.map((list, i) => {
        const converted = JSON.stringify(list);
        const data = JSON.parse(converted);
        const label = "start: " + data.start_time + " end: " + data.end_time;
        const value = label;
        recommendationOptions = [...recommendationOptions, { label, value }];
      });
  }, [start_date, start_time, end_time, friend]);

  if (!show) return null;

  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center" onClick={onClose}>
      <div className="w-2/5 py-3 px-6 shadow-xl rounded-md justify-self-end bg-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-bold text-2xl text-center">{(schedule.schedule?.id && "Detail") || "New Schedule"}</p>
        <div className="flex mt-3">
          <div className="w-1/2 ml-2 mr-8">
            <InputField label={"Title"} placeholder={"Enter title here"} onChange={(title) => setTitle(title)} value={title} />
            <InputField
              label={"Description"}
              placeholder={"Enter description"}
              onChange={(description) => setDescription(description)}
              value={description}
            />
            <InputField label={"Location"} placeholder={"Enter location"} onChange={(location) => setLocation(location)} value={location} />
            <p className="font-semibold mt-2">People</p>
            <div className="py-1 pr-3 border-b border-biruTua flex justify-between">
              <input
                className="appearance-none bg-transparent px-2 py-1 w-3/4 text-gray-700 leading-tight focus:outline-none border-none"
                placeholder="Search username"
                onChange={(e) => handleSearchUser(e)}
                value={name}
              />
              <div className="self-center">
                <IconSearch width={"1rem"} height={"1rem"} />
              </div>
            </div>
            <div className="flex mt-2">
              {(people?.length &&
                people.map((list) => (
                  <div className="text-sm px-1 shadow-lg rounded-md bg-ijo ml-1 cursor-pointer" onClick={() => handleDeletePeople(list.id)}>
                    {list.username}
                  </div>
                ))) ||
                null}
            </div>
            {(users?.length &&
              users.map((list) => (
                <div className="flex justify-between mt-2" key={list.id}>
                  <div className="flex">
                    <div className="w-8 h-8 border border-black border-opacity-5 rounded-full bg-abuTua">
                      <img
                        className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                        src={`http://127.0.0.1:8000/api/user/image/${list.photo}`}
                        alt="Profile"
                      />
                    </div>
                    <p className="ml-3 self-center">{list.username}</p>
                  </div>
                  <div className="flex self-center">
                    <button
                      className="bg-biruTua hover:bg-biru text-white text-xs rounded-md px-3 h-5 mx-2"
                      onClick={() => handleAddPeople(list.username, list.id)}
                    >
                      add
                    </button>
                  </div>
                </div>
              ))) ||
              null}
          </div>
          <div className="w-1/2 mr-2 ml-8">
            <InputField
              label={"Date"}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(date);
              }}
              value={start_date}
              type={"date"}
            />
            {/* <InputField label={"End Date"} onChange={(date) => setEndDate(date)} value={end_date} type={"date"} /> */}
            <div className="mt-2">
              <p className="font-semibold">Time</p>
              <label>From: </label>
              <input type="time" name="start" value={start_time} className="border rounded-lg text-sm px-2 py-1" onChange={onChangeStartTime} />
              <label className="ml-3">To: </label>
              <input type="time" name="start" value={end_time} className="border rounded-lg text-sm px-2 py-1" onChange={onChangeEndTime} />
            </div>
            <div className="flex">
              <label className="self-center mr-2">Recommendation: </label>
              {/* <SelectField options={recommendationOptions} value={recom} onChange={(recom) => setRecom(recom)} /> */}
              <SelectField placeholder={"choose repetition"} options={repeatOptions} value={repeat} onChange={(repeat) => setRepeat(repeat)} />
            </div>
            <div className="flex">
              <SelectField
                placeholder={"choose repetition"}
                label={"Repeat"}
                options={repeatOptions}
                value={repeat}
                onChange={(repeat) => setRepeat(repeat)}
              />
              <div className="mx-1" />
              <SelectField
                placeholder={"choose notification"}
                label={"Notification"}
                options={notificationOptions}
                value={notification}
                onChange={(notification) => setNotification(notification)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {schedule.schedule?.id && <DeleteButton onClick={handleDeleteSchedule} />}
          <WhiteButton onClick={onClose} text={"cancel"} />
          {(schedule.schedule?.id && <GreenButton onClick={handleUpdateSchedule} text={"update"} />) || (
            <GreenButton onClick={handleAddSchedule} text={"save"} />
          )}
        </div>
      </div>
    </div>
  );
}
