import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, getAllFriend } from "../redux/actions/friend";
import FriendCard from "../components/Cards/friendCard";
import FriendModal from "../components/Modal/FriendModal";

export default function Friend({ show, onClose }) {
  const friends = useSelector((state) => state.friend.friends);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFriend());
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-10 px-4 md:px-12">
        {(friends?.length &&
          friends.map((user) => (
            <FriendCard
              reload={() => dispatch(getAllFriend())}
              key={user.id}
              username={user.fullname}
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
