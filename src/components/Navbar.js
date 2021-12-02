import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProfile } from "../actions/profil";
import Logo from "../assets/logo.svg";
import { IconMenu, IconToday } from "./Icons";

export default function Navbar({ toggle, toggleCreate, toggleToday, isLanding }) {
  const location = useLocation().pathname;
  const profile = useSelector((state) => state.profile.results);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="relative flex justify-between px-4 py-2 bg-biruTua sticky top-0 z-50 shadow-xl sm:px-6 sm:py-4 md:space-x-10 md:h-full">
      <div className="flex flex-wrap content-center text-white">
        {isLanding ? null : <IconMenu onClick={toggle} />}
        <img src={Logo} className="shadow-2xl ml-6" alt="logo" />
        <p className="font-comforta font-semibold flex flex-wrap content-center ml-2 text-2xl">atur aja</p>
      </div>
      {isLanding ? (
        <div className="flex flex-wrap content-center text-white font-mulish">
          <div className="flex flex-wrap content-center hidden md:flex">
            <Link to="/">
              <p className="font-semibold text-lg mx-4 hover:text-gray-400">Fitur</p>
            </Link>
            <Link to="/">
              <p className="font-semibold text-lg mx-4 hover:text-gray-400">Download</p>
            </Link>
            <Link to="/">
              <p className="font-semibold text-lg mx-4 hover:text-gray-400">Bantuan</p>
            </Link>
          </div>
          <div className="flex flex-wrap content-center md:flex">
            <Link to="/login">
              <button className="bg-biru hover:bg-biruTua px-8 py-2 rounded-full ml-4 mr-2 shadow-2xl">Login</button>
            </Link>
            <Link to="/signup">
              <button className="bg-white hover:bg-biruTua hover:text-white px-8 py-2 rounded-full text-gray-600 ml-2 shadow-2xl">Register</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex self-center">
          {location === "/friends" ? (
            <p className="cursor-pointer flex flex-wrap content-center text-white font-mulish" onClick={toggleCreate}>
              + Add Friend
            </p>
          ) : (
            <div className="flex">
              <p className="cursor-pointer flex flex-wrap content-center text-white font-mulish" onClick={toggleCreate}>
                + Create
              </p>
              {location === "/home" ? (
                <div className="flex flex-wrap content-center ml-6 cursor-pointer" onClick={toggleToday}>
                  <IconToday width="1.25rem" height="1.25rem" />
                  <p className="flex flex-wrap content-center text-white font-mulish ml-1">Today</p>
                </div>
              ) : null}
            </div>
          )}
          <div className="w-10 h-10 rounded-full bg-abuTua ml-4">
            <img
              className="inline object-cover w-full h-full items-center justify-center place-self-center rounded-full"
              src={`http://127.0.0.1:8000/api/user/image/${profile.photo}`}
              alt="Profile"
            />
          </div>
        </div>
      )}
    </div>
  );
}
