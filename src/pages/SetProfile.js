import React, { useState } from "react";
import { setProfile } from "../redux/actions/profil";
import { useDispatch } from "react-redux";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";
import { ReactComponent as User } from "../assets/user.svg";
import { ReactComponent as Call } from "../assets/call.svg";
import { Link, useHistory } from "react-router-dom";
import { IconCamera } from "../components/Icons";
import Swal from "sweetalert2";

export default function SetProfile() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    if (event.target.files.length !== 0) {
      setImage(event.target.files[0]);
    }
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

  let history = useHistory();
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    if (fullName !== "" && image !== null && phoneNumber !== "") {
      dispatch(setProfile(fullName, image, phoneNumber))
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Profil updated successfully",
          });
          history.push("/home");
        })
        .catch(() => {
          Toast.fire({
            icon: "warning",
            title: "The given data was invalid",
          });
          setLoading(false);
        });
    } else {
      Toast.fire({
        icon: "warning",
        title: "The given data was invalid",
      });
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave(e);
    }
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
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="grid mt-14">
            <div className="flex justify-center">
              <Link to="/home">
                <AuthButton text={"Done"} loading={loading} onClick={handleSave} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
