import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProfile } from "../redux/actions/profil";
import Logo from "../assets/logo.svg";
import { IconMenu, IconToday } from "./Icons";
import { baseUrl } from "../helpers/config";

export default function Navbar({ toggle, toggleCreate, toggleToday, isLanding }) {
  const location = useLocation().pathname;
  const profile = useSelector((state) => state.profile.results);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className="relative md:flex md:justify-between px-4 py-2 bg-biruTua sticky top-0 z-50 shadow-xl md:space-x-10 md:h-full">
      <div className="flex justify-between items-center">
        <div className="flex content-center text-white">
          {isLanding ? null : <IconMenu onClick={toggle} />}
          <img src={Logo} className="w-8 h-8 md:w-12 md:h-12 shadow-2xl md:ml-6 mb-2" alt="logo" />
          <p className="font-comforta font-semibold flex content-center ml-2 text-lg md:text-2xl md:mt-2">atur aja</p>
        </div>
        {isLanding ? (
          <button onClick={() => setIsMobile(!isMobile)} className="md:hidden">
            <svg width="25" height="25" stroke="#FFFFFF" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={!isMobile ? "block" : "hidden"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                className={isMobile ? "block" : "hidden"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.3002 5.70973C17.9102 5.31973 17.2802 5.31973 16.8902 5.70973L12.0002 10.5897L7.11022 5.69973C6.72022 5.30973 6.09021 5.30973 5.70021 5.69973C5.31021 6.08973 5.31021 6.71973 5.70021 7.10973L10.5902 11.9997L5.70021 16.8897C5.31021 17.2797 5.31021 17.9097 5.70021 18.2997C6.09021 18.6897 6.72022 18.6897 7.11022 18.2997L12.0002 13.4097L16.8902 18.2997C17.2802 18.6897 17.9102 18.6897 18.3002 18.2997C18.6902 17.9097 18.6902 17.2797 18.3002 16.8897L13.4102 11.9997L18.3002 7.10973C18.6802 6.72973 18.6802 6.08973 18.3002 5.70973V5.70973Z"
              />
            </svg>
          </button>
        ) : null}
      </div>
      {isLanding ? (
        <div className={`${isMobile ? "block" : "hidden"} md:flex flex-col md:flex-row content-center text-white font-mulish`}>
          <div className="flex flex-col md:flex-row content-center md:flex md:my-4">
            <Link to="/">
              <p className="border-t-2 md:border-t-0 font-semibold text-lg mx-0 md:mx-4 hover:text-gray-400">Fitur</p>
            </Link>
            <Link to="/">
              <p className="font-semibold text-lg mx-0 md:mx-4 hover:text-gray-400">Download</p>
            </Link>
            <Link to="/">
              <p className="font-semibold text-lg mx-0 md:mx-4 hover:text-gray-400">Bantuan</p>
            </Link>
          </div>
          <div className="flex md:flex-row content-center justify-between py-2">
            <Link to="/login">
              <button className="bg-biru hover:bg-biruTua px-4 md:px-8 py-2 rounded md:rounded-full ml-0 md:ml-2 md:ml-4 mr-2 shadow-2xl">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white hover:bg-biruTua hover:text-white px-4 md:px-8 py-2 rounded md:rounded-full text-gray-600 ml-2 shadow-2xl">
                Register
              </button>
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
              src={`${baseUrl}/api/user/image/${profile.photo}`}
              alt="Profile"
            />
          </div>
        </div>
      )}
    </div>
  );
}
