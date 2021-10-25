import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { IconHome, IconLogout, IconSchedule, IconSetting, IconTask } from "./Icons";

const menuLinks = [
  { target: "/", text: "Home", icon: <IconHome /> },
  { target: "/", text: "Schedule", icon: <IconSchedule /> },
  { target: "/", text: "Task", icon: <IconTask /> },
  { target: "/", text: "Friends", icon: <IconTask /> },
  { target: "/", text: "Groups", icon: <IconTask /> },
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
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div
      className={
        "bg-biruTua shadow-lg group fixed top-0 left-0 " +
        (isOpen ? "w-60 z-20 lg:z-30" : "w-14 hover:w-60 hidden lg:block lg:z-30 transition-all ease-in-out duration-300")
      }
    >
      <div className="h-screen text-white pt-20 pb-4 grid place-content-between">
        <div>
          {menuLinks.map(({ target, text, icon }, idx) => (
            <MenuLink key={idx} target={target} icon={icon} text={text} open={isOpen} />
          ))}
        </div>
        <div>
          <MenuLink target="/" icon={<IconSetting />} text={"Settings"} open={isOpen} />
          <MenuLink target="/login" icon={<IconLogout />} text={"Logout"} open={isOpen} onClick={logOut} />
        </div>
      </div>
    </div>
  );
}
