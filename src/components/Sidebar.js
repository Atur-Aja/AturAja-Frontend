import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";
import { IconHome, IconLogout, IconSchedule, IconSetting, IconTask, IconFriend } from "./Icons";
import { getAllFriendReq } from "../redux/actions/friend";

const menuLinks = [
  { target: "/home", text: "Home", icon: <IconHome /> },
  { target: "/schedule", text: "Schedule", icon: <IconSchedule /> },
  { target: "/task", text: "Task", icon: <IconTask /> },
];

const MenuLink = ({ target, text, icon, open, ...props }) => {
  return (
    <Link to={target} className="px-4 py-2 h-10 flex rounded-lg cursor-pointer" onClick={props.onClick}>
      {icon}
      <p className={"text-lg ml-4" + (open ? "" : " hidden group-hover:block")}>{text}</p>
    </Link>
  );
};

export default function Sidebar({ isOpen }) {
  const request = useSelector((state) => state.friend.request);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriendReq());
  }, []);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div
      className={
        "bg-biruTua shadow-lg group fixed top-0 left-0 " +
        (isOpen ? "w-60 z-30 lg:z-40" : "w-14 hover:w-60 hidden lg:block lg:z-40 transition-all ease-in-out duration-300")
      }
    >
      <div className="h-screen text-white pt-20 pb-4 grid place-content-between">
        <div>
          {menuLinks.map(({ target, text, icon }, idx) => (
            <MenuLink key={idx} target={target} icon={icon} text={text} open={isOpen} />
          ))}
          <MenuLink
            target="/friends"
            icon={
              <div className="relative">
                <IconFriend />
                {(request?.length && <div className="absolute z-50 top-0 right-0 w-2 h-2 rounded-full bg-red-600" />) || null}
              </div>
            }
            text={"Friends"}
            open={isOpen}
          />
        </div>
        <div>
          <MenuLink target="/setting" icon={<IconSetting />} text={"Settings"} open={isOpen} />
          <MenuLink target="/login" icon={<IconLogout />} text={"Logout"} open={isOpen} onClick={logOut} />
        </div>
      </div>
    </div>
  );
}
