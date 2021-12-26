import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, declineRequest, getAllFriendReq, getAllFriendReqSent, inviteFriend, searchUser } from "../../redux/actions/friend";
import { IconSearch } from "../Icons";
import { GreenButton, WhiteButton } from "../Commons/LinkButton";
import Swal from "sweetalert2";
import { baseUrl } from "../../helpers/config";

export default function FriendModal({ onClose, show }) {
  const users = useSelector((state) => state.friend.results);
  const request = useSelector((state) => state.friend.request);
  const reqSent = useSelector((state) => state.friend.reqSent);
  const [loadSearch, setloadSearch] = useState(false);
  const [loadWaiting, setLoadWaiting] = useState(false);
  const [loadInv, setloadInv] = useState([]);
  const [loadAcc, setloadAcc] = useState([]);
  const [loadDec, setloadDec] = useState([]);

  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [onClose]);

  const dispatch = useDispatch();
  const handleSearchUser = (e) => {
    setName(e.target.value);
    setloadSearch(true);
    dispatch(searchUser(e.target.value)).then(() => setloadSearch(false));
  };

  const [isInvite, setIsInvite] = useState(true);
  const toggleInvite = () => {
    setIsInvite(true);
  };
  const toggleWaiting = () => {
    setIsInvite(false);
    setLoadWaiting(true);
    dispatch(getAllFriendReq()).then(() => setLoadWaiting(false));
    dispatch(getAllFriendReqSent()).then(() => setLoadWaiting(false));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleInviteUser = (user_id, i) => {
    let newArr = [...loadInv];
    newArr[i] = true;
    setloadInv(newArr);
    dispatch(inviteFriend(user_id)).then(() => {
      dispatch(searchUser(name));
      setloadInv([]);
      Toast.fire({
        icon: "success",
        title: "Successfully send invitation",
      });
    });
  };
  const handleAcceptRequest = (user_id, i) => {
    let newArr = [...loadAcc];
    newArr[i] = true;
    setloadAcc(newArr);
    dispatch(acceptRequest(user_id)).then(() => {
      setloadAcc([]);
      Toast.fire({
        icon: "success",
        title: "Successfully accept invitation",
      });
    });
    dispatch(getAllFriendReq());
  };
  const handleDeclineRequest = (user_id, i) => {
    let newArr = [...loadDec];
    newArr[i] = true;
    setloadDec(newArr);
    dispatch(declineRequest(user_id)).then(() => {
      setloadDec([]);
      Toast.fire({
        icon: "success",
        title: "Successfully decline invitation",
      });
    });
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
                  "flex justify-center w-1/2 py-1 text-biruTua text-xl font-bold border-b border-biruTua rounded-tl-md " +
                  (isInvite ? "" : "text-white bg-biruTua")
                }
                onClick={toggleWaiting}
              >
                <p>Waiting List</p>
                {(request?.length && <div className=" w-2 h-2 rounded-full bg-red-600" />) || null}
              </div>
            </div>
            {(isInvite && (
              <div className="mx-6 my-3 px-2 py-1 border-b border-biruTua flex justify-between">
                <input
                  className="appearance-none bg-transparent w-1/2 text-gray-700 leading-tight focus:outline-none border-none"
                  placeholder="search username"
                  onChange={(e) => handleSearchUser(e)}
                  value={name}
                />
                <div className="flex self-center">
                  {loadSearch ? <div className="mr-3 loader ease-linear rounded-full border-2 border-t-2 border-gray-600 h-4 w-4" /> : null}
                  <IconSearch width={"1rem"} height={"1rem"} />
                </div>
              </div>
            )) ||
              null}
          </div>
          <div className="px-6 py-3">
            {(isInvite &&
              ((loadSearch && (
                <div className="h-full w-full flex flex-wrap content-center justify-center">
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce150"></div>
                </div>
              )) ||
                (users?.length &&
                  users.map((list, i) => (
                    <div className="flex justify-between mb-2" key={list.id}>
                      <div className="flex">
                        <div className="w-10 h-10 border border-black rounded-full">
                          <img
                            className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                            src={`${baseUrl}/api/user/image/${list.photo}`}
                            alt="Profile"
                          />
                        </div>
                        <p className="text-lg ml-3 font-semibold self-center">{list.username}</p>
                      </div>
                      <div className="flex self-center">
                        <GreenButton
                          text={list.invited == "true" ? "invited" : "invite"}
                          onClick={(e) => handleInviteUser(list.id, i)}
                          loading={loadInv[i]}
                          invited={list.invited == "true"}
                        />
                      </div>
                    </div>
                  ))))) ||
              null}
            {(!isInvite &&
              ((loadWaiting && (
                <div className="h-full w-full flex flex-wrap content-center justify-center mt-4">
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-1 animate-bounce50"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full mr-1 animate-bounce100"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce150"></div>
                </div>
              )) || (
                <div>
                  {(request?.length &&
                    request.map((list, i) => (
                      <div className="flex justify-between mb-3">
                        <div className="flex">
                          <div className="w-10 h-10 border border-black rounded-full">
                            <img
                              className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
                              src={`${baseUrl}/api/user/image/${list.photo}`}
                              alt="Profile"
                            />
                          </div>
                          <p className="text-lg ml-3 font-semibold self-center">{list.username}</p>
                        </div>
                        <div className="flex self-center">
                          <WhiteButton text={"ignore"} onClick={() => handleDeclineRequest(list.id, i)} loading={loadDec[i]} />
                          <GreenButton text={"accept"} onClick={() => handleAcceptRequest(list.id, i)} loading={loadAcc[i]} />
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
                              src={`${baseUrl}/api/user/image/${list.photo}`}
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
              ))) ||
              null}
          </div>
        </div>
      </div>
    </div>
  );
}
