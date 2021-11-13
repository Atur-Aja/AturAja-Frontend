import React from "react";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../actions/friend";
import girl from "../../assets/girl.jpg";

export default function FriendCard({ username, photo, email, phoneNumber, id }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFriend(id));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mt-4 cursos-pointer flex justify-between">
      <div className="bg-abuTua shadow-xl w-20 h-20 rounded-full justify-self-center flex flex-wrap content-center justify-center">
        <img className="inline object-cover w-20 h-20 items-center justify-center place-self-center rounded-full" src={girl} alt="Profile" />
      </div>
      <div className="text-center self-center text-md text-abuTua">
        <p className="font-semibold text-lg text-black">{username}</p>
        <p>{email}</p>
        <p>{phoneNumber}</p>
      </div>
      <button className="self-center bg-red-600 hover:bg-red-800 shadow-xl text-white rounded-lg px-3 py-1 mx-2" onClick={handleDelete}>
        remove friend
      </button>
    </div>
  );
}
