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
    label: "daily",
    value: "daily",
  },
  {
    label: "weekly",
    value: "weekly",
  },
  {
    label: "monthly",
    value: "monthly",
  },
  {
    label: "never",
    value: "never",
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

export default function ScheduleModal({ onClose, show, schedule }) {
  const users = useSelector((state) => state.friend.results);
  const recommendation = useSelector((state) => state.schedule.matched);

  console.log(recommendation);

  const [addLoad, setAddLoad] = useState(false);
  const [delLoad, setDelLoad] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [repeat, setRepeat] = useState("");
  const [notification, setNotification] = useState("");
  const [friend, setFriend] = useState([]);
  const [name, setName] = useState("");
  const [people, setPeople] = useState([]);
  const [recom, setRecom] = useState([]);
  const [selRecom, setSelRecom] = useState("");

  const dispatch = useDispatch();
  const handleAddSchedule = (e) => {
    e.preventDefault();
    setAddLoad(true);
    dispatch(createSchedule(title, description, location, date, start_time, end_time, repeat, notification, friend)).then(() => {
      Swal.fire({
        text: "Your schedule has been created successfully.",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      });
      setAddLoad(false);
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
        setAddLoad(true);
        dispatch(
          updateScheduleById(schedule.schedule.id, title, description, location, date, start_time, end_time, repeat, notification, friend)
        ).then(() => {
          Swal.fire({
            title: "Updated!",
            text: "Your schedule has been updated successfully.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          setAddLoad(false);
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
        setDelLoad(true);
        dispatch(deleteScheduleById(schedule.schedule.id)).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your schedule has been deleted successfully.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
          setDelLoad(false);
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
      setDate(schedule.schedule.date);
      setStartTime(schedule.schedule.start_time);
      setEndTime(schedule.schedule.end_time);
      setRepeat(schedule.schedule.repeat);
      setNotification(schedule.schedule.notification);

      if (schedule.member?.length) {
        const people = schedule.member.map((mem) => ({ username: mem.username, id: mem.id }));
        setPeople([...people]);
        const peopleIds = people.map((person) => person.id);
        setFriend([...peopleIds]);
      }
    } else {
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setRepeat("");
      setNotification("");
    }
  }, [schedule]);

  useEffect(() => {
    const date = selRecom.toString().split(" ");
    setDate(date[1]);
    setStartTime(date[3]);
    setEndTime(date[5]);
  }, [selRecom]);

  const handleSearchUser = (e) => {
    setName(e.target.value);
    setSearchLoad(true);
    dispatch(searchFriend(e.target.value)).then(() => setSearchLoad(false));
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
    dispatch(matchSchedule(date, start_time, end_time, friend));
    if (recommendation.rekomendasi?.length) {
      const dataRecom = recommendation.rekomendasi.map((list) => ({
        label: "date: " + list.date + " start: " + list.start_time + " end: " + list.end_time,
        value: "date: " + list.date + " start: " + list.start_time + " end: " + list.end_time,
      }));
      setRecom([...dataRecom]);
    } else {
      setRecom([]);
    }
  }, [date, start_time, end_time, friend]);

  if (!show) return null;

  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center" onClick={onClose}>
      <div className="invisible md:visible md:w-screen lg:w-2/5 md:mx-5 py-3 px-6 shadow-xl rounded-md justify-self-end bg-white" onClick={(e) => e.stopPropagation()}>
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
              <div className="flex self-center">
                {searchLoad ? <div class="mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-600 h-4 w-4" /> : null}
                <IconSearch width={"1rem"} height={"1rem"} />
              </div>
            </div>
            <div className="flex mt-2">
              {(people?.length &&
                people.map((list) =>
                  list.username == localStorage.getItem("username") ? null : (
                    <div className="relative text-sm px-2 py-1 shadow-lg rounded-md bg-ijo ml-1">
                      <label className="absolute z-50 -top-3 -right-1 cursor-pointer" onClick={() => handleDeletePeople(list.id)}>
                        x
                      </label>
                      {list.username}
                    </div>
                  )
                )) ||
                null}
            </div>
            {(users?.length &&
              users.map((list) => (
                <div className="flex justify-between mt-2" key={list.id}>
                  <div className="flex">
                    <div className="w-8 h-8 border border-black border-opacity-5 rounded-full bg-gray-400">
                      {(list.photo && (
                        <img
                          className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                          src={`http://127.0.0.1:8000/api/user/image/${list.photo}`}
                          alt="Profile"
                        />
                      )) ||
                        null}
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
                setDate(date);
              }}
              value={date}
              type={"date"}
            />
            <div className="mt-2">
              <p className="font-semibold">Time</p>
              <label>From: </label>
              <input type="time" name="start" value={start_time} className="border rounded-lg text-sm px-2 py-1" onChange={onChangeStartTime} />
              <label className="ml-3">To: </label>
              <input type="time" name="start" value={end_time} className="border rounded-lg text-sm px-2 py-1" onChange={onChangeEndTime} />
            </div>
            {(recom?.length && (
              <div>
                <label className="self-center mr-2">Recommendation: </label>
                <SelectField placeholder={"choose recommendation"} options={recom} value={selRecom} onChange={(recom) => setSelRecom(recom)} />
              </div>
            )) ||
              null}
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
        <div className="flex justify-end my-4">
          {schedule.schedule?.id && <DeleteButton onClick={handleDeleteSchedule} loading={delLoad} />}
          <WhiteButton onClick={onClose} text={"cancel"} />
          {(schedule.schedule?.id && <GreenButton onClick={handleUpdateSchedule} text={"update"} loading={addLoad} />) || (
            <GreenButton onClick={handleAddSchedule} text={"save"} loading={addLoad} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
      <div className="z-50 md:hidden overflow-auto w-60 h-112 shadow-xl rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-bold text-xl text-center mt-2">{(schedule.schedule?.id && "Detail") || "New Schedule"}</p>
          <div className="flex-wrap mt-2">
            <div className="w-52 mx-4">
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
                <div className="flex self-center">
                  {searchLoad ? <div class="mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-600 h-4 w-4" /> : null}
                  <IconSearch width={"1rem"} height={"1rem"} />
                </div>
              </div>
              <div>
                {(people?.length &&
                  people.map((list) =>
                    list.username == localStorage.getItem("username") ? null : (
                      <div className="relative text-sm px-2 py-1 shadow-lg rounded-md bg-ijo ml-1">
                        <label className="absolute z-50 -top-3 -right-1 cursor-pointer" onClick={() => handleDeletePeople(list.id)}>
                          x
                        </label>
                        {list.username}
                      </div>
                    )
                  )) ||
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
              <div>
                <InputField
                  label={"Date"}
                  onChange={(date) => {
                    setDate(date);
                  }}
                  value={date}
                  type={"date"}
                />
              </div>
              <div>
                  <p className="font-semibold">Time</p>
                  <label>From: </label>
                  <input type="time" name="start" value={start_time} className="border rounded-lg text-sm px-2 py-1" onChange={onChangeStartTime} />
                  <label className="flex md:ml-3">To: </label>
                  <input type="time" name="start" value={end_time} className="border rounded-lg text-sm px-2 py-1" onChange={onChangeEndTime} />
              </div>
              {(recom?.length && (
                <div className="flex">
                  <label className="self-center mr-2">Recommendation: </label>
                  <SelectField placeholder={"choose recommendation"} options={recom} value={selRecom} onChange={(recom) => setSelRecom(recom)} />
                </div>
              )) ||
                null}
              <div className="flex-wrap">
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
          <div className="flex justify-end my-4 mr-2">
            {schedule.schedule?.id && <DeleteButton onClick={handleDeleteSchedule} loading={delLoad} />}
            <WhiteButton onClick={onClose} text={"cancel"} />
            {(schedule.schedule?.id && <GreenButton onClick={handleUpdateSchedule} text={"update"} loading={addLoad} />) || (
              <GreenButton onClick={handleAddSchedule} text={"save"} loading={addLoad} />
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
