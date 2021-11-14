import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriend } from "../actions/friend";
import FriendCard from "../components/Cards/friendCard";
import FriendModal from "../components/Modal/FriendModal";

export default function Friend({ show, onClose }) {
  const friends = useSelector((state) => state.friend.friends);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFriend());
  }, [dispatch]);

  const closeFriend = (e) => {
    onClose && onClose(e);
  };

  return (
    <div className="h-screen px-4 pt-4">
      <FriendModal onClose={closeFriend} show={show} />
      <p className="font-semibold text-xl">Friends</p>
      <div className="grid grid-cols-3 gap-4">
        {(friends?.length &&
          friends.map((user) => (
            <FriendCard
              key={user.id}
              username={user.username}
              email={user.email}
              phoneNumber={user.phone_number}
              id={user.id}
              photo={`http://127.0.0.1:8000/api/user/image/${user.photo}`}
            />
          ))) ||
          null}
      </div>
    </div>
  );
}
