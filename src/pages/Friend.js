import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, getAllFriend } from "../redux/actions/friend";
import FriendCard from "../components/Cards/friendCard";
import FriendModal from "../components/Modal/FriendModal";
import { IconFriend } from "../components/Icons";
import { toggleCreate } from "../redux/actions/bar";

export default function Friend() {
  const friends = useSelector((state) => state.friend.friends);
  const isCreate = useSelector((state) => state.bar.create);
  const isSidebar = useSelector((state) => state.bar.sidebar);
  const [loadFriends, setLoadFriends] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoadFriends(true);
    dispatch(getAllFriend()).then(() => setLoadFriends(false));
  }, [dispatch]);

  const closeFriend = (e) => {
    dispatch(clearSearch());
    dispatch(toggleCreate(false));
  };

  return (
    <div className={"h-screen px-4 pt-4 transition-all ease-in-out duration-200 " + (isSidebar ? "lg:ml-60" : "lg:ml-14")}>
      <FriendModal onClose={closeFriend} show={isCreate} />
      {loadFriends ? (
        <div className="min-h-screen items-center flex flex-wrap content-center justify-center">
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full animate-bounce150"></div>
        </div>
      ) : (
        (friends?.length && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
            {friends.map((user) => (
              <FriendCard
                reload={() => dispatch(getAllFriend())}
                key={user.id}
                username={user.fullname}
                email={user.email}
                phoneNumber={user.phone_number}
                id={user.id}
                photo={user.photo}
              />
            ))}
          </div>
        )) || (
          <div className="min-h-screen items-center flex flex-wrap content-center justify-center grid">
            <div className="md:hidden w-24 h-24 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
              <IconFriend width={"60"} height={"60"} />
            </div>
            <p className="text-xl justify-self-center font-semibold">No Friend</p>
            <p className="justify-self-center text-center">you can build connection by clicking “add friend” button</p>
          </div>
        )
      )}
    </div>
  );
}
