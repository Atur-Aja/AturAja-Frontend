import React from "react";
import { RemoveButton} from "../Commons/LinkButton";

export default function FriendCard() {
  return (
    <div className="bg-white shadow-lg rounded-md px-4 py-2 mt-4 cursor-pointer">
        <div className="w-1/2">
            <img 
                class="inline object-cover w-24 h-24 items-center justify-center place-self-center rounded-full"
                //src={image}
                alt="Profile image"
            />
        </div>
        <div className="w-1/2 my-2">
            <p className="mt-2 text-semibold text-2xl font-bold">Katty</p>
            <p className="text-regular text-base font-bold text-gray-600">katty@gmail.com</p>
            <p className="text-regular text-base font-bold text-gray-600">012345678912</p>
            <Link to="/home">
                <RemoveButton text={"Remove Friend"} />
            </Link>
        </div>
    </div>
  );
}