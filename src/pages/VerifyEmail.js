import React from "react";
import { AuthButton } from "../components/Commons/LinkButton";
import { Link } from "react-router-dom";
//import { IconEmail } from "../components/Icons";
import { IconSchedule } from "../components/Icons";

export default function VerifyEmail() {
  return (
    <div>
      <div className="h-screen flex justify-center bg-biruTua pt-24">
        <div className="w-112 h-144 rounded-xl px-9 py-14 bg-abuMuda">
          <div className="mx-4 grid justify-center">
            {/* <IconEmail width={"40"} height={"40"} /> */}
            <div className="mx-4 mb-12 grid justify-center">
                <IconSchedule width={"80"} height={"80"} />
            </div>
            <p className="text-black text-lg font-bold place-self-center">Verify your Email Address</p>
            <p className="my-3 mx-8 text-semibold text-base place-self-center text-gray-600">
                To complete your profile and getting started with Atur Aja, you’ll need to verify your email address. 
            </p>
          </div>
          <div className="mt-8 mx-4">
            <div className="flex justify-center">
                <Link to="/home">
                    <AuthButton text={"Verify"} />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
