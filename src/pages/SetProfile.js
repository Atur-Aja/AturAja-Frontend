import React, { useEffect, useState } from "react";
import { setProfile } from "../actions/profil";
import { useDispatch, useSelector } from "react-redux";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import { ReactComponent as User } from "../assets/user.svg";
import { ReactComponent as Call } from "../assets/call.svg";
import { Link } from "react-router-dom";
import { IconCamera } from "../components/Icons";
import { clearMessage } from "../actions/message";

export default function SetProfile() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);

  const { message } = useSelector((state) => state.message);

  const handleInput = (event) => {
    if (event.target.files.length !== 0) {
      setImage(event.target.files[0]);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(setProfile(fullName, image, phoneNumber));
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-biruTua">
        <div className="w-80 h-112 md:w-96 md:h-128 rounded-xl px-2 md:px-4 py-14 bg-abuMuda">
          <div className="mx-4 grid justify-center">
            <p className="text-black text-base md:text-lg font-bold place-self-center mb-4">Set your profile</p>
            <div className="bg-white relative shadow-xl w-20 h-20 md:w-24 md:h-24 rounded-full justify-self-center flex flex-wrap content-center justify-center">
              {image ? (
                <img
                  className="inline object-cover w-20 h-20 md:w-24 md:h-24 items-center justify-center place-self-center rounded-full"
                  src={URL.createObjectURL(image)}
                  alt="Profile"
                />
              ) : (
                <p className="text-gray-500 text-xs md:text-sm">add photo</p>
              )}
              <label className="absolute z-50 bottom-0 right-0 bg-biru text-white rounded-full p-1 cursor-pointer">
                <input type="file" className="hidden" onChange={handleInput} />
                <IconCamera />
              </label>
            </div>
          </div>
          <div className="mt-6 mx-4">
            <AuthField placeholder={"Full Name"} value={fullName} onChange={(fullName) => setFullName(fullName)} icon={<User />} />
            <AuthField
              placeholder={"Phone Number"}
              value={phoneNumber}
              onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
              icon={<Call />}
              type={"number"}
            />
          </div>
          <div className="grid mt-14">
            <div className="flex justify-center">
              <Link to="/home">
                <AuthButton text={"Done"} onClick={handleSave} />
              </Link>
            </div>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
