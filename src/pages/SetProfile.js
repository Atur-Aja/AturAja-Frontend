import React from "react";
import { ReactComponent as User } from "../assets/user.svg";
import { ReactComponent as Call } from "../assets/call.svg";
//import { ReactComponent as Camera } from "../assets/camera.svg";
import { AuthField } from "../components/Commons/FormField";
import { AuthButton } from "../components/Commons/LinkButton";

export default function SetUser () {
return (
    <div className='h-screen flex justify-center bg-biruTua pt-24'>
      <div className='w-112 h-144 rounded-xl px-8 py-14 bg-abuMuda'>
        <div className="mx-4 grid justify-center">
          <p className="text-black text-lg font-bold place-self-center">Set your profile</p>
          <img class="inline object-cover w-24 h-24 mr-2 mt-6 items-center justify-center place-self-center rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
          {/* <div class="rounded-full h-24 w-24 mt-6 shadow-xl flex items-center justify-center place-self-center bg-white">
          <Camera />
          </div> */}
        </div>
        
        <div className='mt-6 mx-4'>
            <AuthField placeholder={"Full Name"} value={fullname} onChange={(fullname) => setFullname(fullname)} icon={<User />} />
            <AuthField placeholder={"Phone Number"} value={phonenumber} onChange={(phonenumber) => setPhonenumber(phonenumber)} icon={<Call  />} />
        </div>

        <div className='grid mt-14'>
          <div className='flex justify-center'>
            <Link to="/home">
                <AuthButton text={"Done"} onClick={handleRegister} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}