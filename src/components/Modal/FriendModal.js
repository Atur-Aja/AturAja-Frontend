import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, declineRequest, getAllFriendReq, getAllFriendReqSent, inviteFriend, searchUser } from "../../actions/friend";
import { IconSearch } from "../Icons";
import girl from "../../assets/girl.jpg";
import { GreenButton, WhiteButton } from "../Commons/LinkButton";

export default function FriendModal({ onClose, show }) {
  const users = useSelector((state) => state.friend.results);
  const request = useSelector((state) => state.friend.request);
  const reqSent = useSelector((state) => state.friend.reqSent);

  const [name, setName] = useState("");
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const dispatch = useDispatch();
  const handleSearchUser = () => {
    dispatch(searchUser(name));
  };

  const [isInvite, setIsInvite] = useState(true);
  const toggleInvite = () => {
    setIsInvite(true);
  };
  const toggleWaiting = () => {
    setIsInvite(false);
    dispatch(getAllFriendReq());
    dispatch(getAllFriendReqSent());
  };

  const handleInviteUser = (user_id) => {
    dispatch(inviteFriend(user_id));
  };
  const handleAcceptRequest = (user_id) => {
    dispatch(acceptRequest(user_id));
    dispatch(getAllFriendReq());
  };
  const handleDeclineRequest = (user_id) => {
    dispatch(declineRequest(user_id));
    dispatch(getAllFriendReq());
  };

  if (!show) return null;

  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center" onClick={onClose}>
      <div className="w-2/5 h-5/12 py-3 px-6 shadow-xl rounded-md justify-self-end bg-white" onClick={(e) => e.stopPropagation()}>
        <p className="font-bold text-2xl text-center">Add Friend</p>
        <div className="w-full h-5/6 mt-4 border border-biruTua rounded-md overflow-y-auto">
          <div className="sticky top-0 bg-white">
            <div className="flex cursor-pointer">
              <div
                className={
                  "w-1/2 py-1 text-biruTua text-center text-xl font-bold border-b border-biruTua rounded-tr-md " +
                  (isInvite ? "text-white bg-biruTua" : "")
                }
                onClick={toggleInvite}
              >
                Invite
              </div>
              <div
                className={
                  "w-1/2 py-1 text-biruTua text-center text-xl font-bold border-b border-biruTua rounded-tl-md " +
                  (isInvite ? "" : "text-white bg-biruTua")
                }
                onClick={toggleWaiting}
              >
                Waiting List
              </div>
            </div>
            {(isInvite && (
              <div className="mx-6 my-3 px-2 py-1 border-b border-biruTua flex justify-between">
                <input
                  className="appearance-none bg-transparent w-1/2 text-gray-700 leading-tight focus:outline-none border-none"
                  placeholder="search username"
                  onChange={(e) => handleChangeName(e)}
                  value={name}
                />
                <IconSearch width={"1rem"} height={"1rem"} onClick={handleSearchUser} />
              </div>
            )) ||
              null}
          </div>
          <div className="px-6 py-3">
            {isInvite &&
              ((users?.length &&
                users.map((list) => (
                  <div className="flex justify-between mb-2" key={list.id}>
                    <div className="flex">
                      <div className="w-10 h-10 border border-black rounded-full">
                        <img
                          className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                          src={`http://127.0.0.1:8000/api/user/image/${list.photo}`}
                          alt="Profile"
                        />
                      </div>
                      <p className="text-lg ml-3 font-semibold self-center">{list.username}</p>
                    </div>
                    <div className="flex self-center">
                      <GreenButton text={"invite"} onClick={() => handleInviteUser(list.id)} />
                    </div>
                  </div>
                ))) ||
                null)}
            {(!isInvite && (
              <div>
                {(request?.length &&
                  request.map((list) => (
                    <div className="flex justify-between mb-3">
                      <div className="flex">
                        <div className="w-10 h-10 border border-black rounded-full">
                          <img
                            className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                            src={`http://127.0.0.1:8000/api/user/image/${list.photo}`}
                            alt="Profile"
                          />
                        </div>
                        <p className="text-lg ml-3 font-semibold self-center">{list.username}</p>
                      </div>
                      <div className="flex self-center">
                        <WhiteButton text={"ignore"} onClick={() => handleDeclineRequest(list.id)} />
                        <GreenButton text={"accept"} onClick={() => handleAcceptRequest(list.id)} />
                      </div>
                    </div>
                  ))) ||
                  null}
                {(reqSent?.length &&
                  reqSent.map((list) => (
                    <div className="flex justify-between mb-3">
                      <div className="flex">
                        <div className="w-10 h-10 border border-black rounded-full">
                          <img
                            className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                            src={`http://127.0.0.1:8000/api/user/image/${list.photo}`}
                            alt="Profile"
                          />
                        </div>
                        <p className="text-lg ml-3 font-semibold self-center">{list.username}</p>
                      </div>
                      <p className="self-center text-abuTua">waiting...</p>
                    </div>
                  ))) ||
                  null}
              </div>
            )) ||
              null}
          </div>
        </div>
      </div>
    </div>
  );
}
