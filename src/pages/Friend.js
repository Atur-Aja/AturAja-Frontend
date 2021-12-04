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
    <div className="h-screen px-4 pt-4">
      <FriendModal onClose={closeFriend} show={show} />
      {loadFriends ? (
        <div className="h-full w-full flex flex-wrap content-center justify-center">
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
        </div>
      ) : (
        (friends?.length && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="h-full w-full flex flex-wrap content-center justify-center grid">
            <div className="w-40 h-40 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
              <IconFriend width={"80"} height={"80"} />
            </div>
            <p className="text-xl justify-self-center font-semibold">No Friend</p>
            <p className="justify-self-center">you can build connection by clicking “add friend” button</p>
          </div>
        )
      )}
    </div>
  );
}
