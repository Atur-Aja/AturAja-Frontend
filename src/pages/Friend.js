import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, getAllFriend } from "../redux/actions/friend";
import FriendCard from "../components/Cards/friendCard";
import FriendModal from "../components/Modal/FriendModal";
import { IconFriend } from "../components/Icons";

export default function Friend({ show, onClose }) {
  const friends = useSelector((state) => state.friend.friends);
  const [loadFriends, setLoadFriends] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoadFriends(true);
    dispatch(getAllFriend()).then(() => setLoadFriends(false));
  }, [dispatch]);

  const closeFriend = (e) => {
    dispatch(clearSearch());
    onClose && onClose(e);
  };

  return (
    <div className="min-h-screen">
      <FriendModal onClose={closeFriend} show={show} />
      <div className="fixed bg-abuMuda w-full pt-4 px-6 md:px-14">
        <p className="font-semibold text-lg md:text-xl">Friends</p>
      </div>
      {loadFriends ? (
        <div className="min-h-screen items-center flex flex-wrap content-center justify-center">
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
        </div>
      ) : (
        (friends?.length && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 pt-10 px-4 md:px-12">
            {friends.map((user) => (
              <FriendCard
                reload={() => dispatch(getAllFriend())}
                key={user.id}
                username={user.fullname}
                email={user.email}
                phoneNumber={user.phone_number}
                id={user.id}
                photo={`http://127.0.0.1:8000/api/user/image/${user.photo}`}
              />
            ))}
          </div>
        )) || (
          <div className="min-h-screen items-center flex flex-wrap content-center justify-center grid">
            <div className="md:hidden w-24 h-24 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
              <IconFriend width={"60"} height={"60"} />
            </div>
            <p className="md:hidden text-base md:text-lg lg:text-xl justify-self-center font-semibold">No Friend</p>
            <p className="md:hidden text-xs md:text-sm lg:text-base text-center justify-self-center">you can build connection by clicking “add friend” button</p>
            <div className="invisible md:visible md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
              <IconFriend width={"112"} height={"112"} />
            </div>
            <p className="invisible md:visible text-base md:text-xl lg:text-2xl justify-self-center font-semibold">No Friend</p>
            <p className="invisible md:visible text-xs md:text-base lg:text-lg text-center justify-self-center">you can build connection by clicking “add friend” button</p>
          </div>
        )
      )}
    </div>
  );
}
