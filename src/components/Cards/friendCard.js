import React from "react";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../redux/actions/friend";
import Swal from "sweetalert2";

export default function FriendCard({ reload, username, photo, email, phoneNumber, id }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this friend? This process cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c1c1c1",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFriend(id)).then(() => {
          Swal.fire("Deleted!", "Your friend has been removed successfully.", "success");
          reload();
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mt-4 cursos-pointer flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border-2 border-gray-200 shadow-xl w-16 h-16 md:w-20 md:h-20 rounded-full justify-self-center flex flex-wrap content-center justify-center">
          {(photo && (
            <img
              className="inline object-cover w-16 h-16 md:w-20 md:h-20 items-center justify-center place-self-center rounded-full"
              src={`https://api.aturaja.me/api/user/image/${photo}`}
              alt="Profile"
            />
          )) ||
            null}
        </div>
        <div className="col-span-2 text-center self-center text-md text-abuTua">
          <p className="font-semibold text-base sm:text-lg text-black">{username}</p>
          <p>{email}</p>
          <p>{phoneNumber}</p>
          <button
            className="w-full items-center justify-center place-self-center bg-red-600 hover:bg-red-800 shadow-xl text-white rounded-lg px-3 py-1 mx-1"
            onClick={handleDelete}
          >
            Remove Friend
          </button>
        </div>
      </div>
    </div>
  );
}
