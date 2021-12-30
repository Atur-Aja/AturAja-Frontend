import React from "react";
import Meeting from "../assets/meeting.jpg";

export default function LandingPage() {
  return (
    <div className="bg-abuMuda">
      <div className="mih-h-screen flex flex-wrap md:flex-nowrap items-center md:items-start justify-center md:justify-start">
        <img src={Meeting} className="w-full md:w-1/2 pt-28 md:pt-20 lg:pt-40 self-center" alt="people meeting" />
        <div className="flex flex-wrap content-center text-abuTua md:self-center">
          <div>
            <p className="font-bold text-4xl md:text-5xl lg:text-6xl">Welcome</p>
            <p className="text-base md:text-lg lg:text-2xl">Bingung cari jadwal ? AturAja!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
