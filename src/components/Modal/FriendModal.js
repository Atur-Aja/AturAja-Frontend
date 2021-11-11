import React from "react";
import { ReactComponent as Search } from "../../assets/search.svg";
import { SaveButton, CancelButton} from "../Commons/LinkButton";
import { Link } from "react-router-dom";
import { InputField } from "../Commons/FormField";
//import { IconPeople } from "../components/Icons/IconPeople";

export default function FriendModal() {
  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-filter flex items-center justify-center">
        <div className="w-2/5 py-3 px-3 shadow-xl rounded-md justify-self-end bg-white">
            <p className="font-bold text-2xl text-center">Add Friend</p>
            <div className="flex mt-3">
                <div className="w-1/2 h-4 py-6 px-3 rounded-t-md flex items-center justify-center bg-white hover:bg-biruTua ">
                    <p className="font-bold text-xl text-center text-biruTua hover:text-white">Add Friend</p>
                </div>
                <div className="w-1/2 h-4 py-6 px-3 rounded-t-md flex items-center justify-center bg-biruTua hover:bg-white ">
                    <p className="font-bold text-xl text-center text-white hover:text-biruTua">Waiting List</p>
                </div>
            </div>

            ini kalo add friend
            <div className="w-auto py-3 px-3 bg-white border-2 border-biruTua rounded-b-md">
                <div classname="py-6 px-6">
                    <InputField placeholder={"Search Username"} icon={<Search />}/>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-4">
                    <div className="flex justify-between">
                        <div>
                            <img
                            class="inline object-cover w-24 h-24 items-center justify-center place-self-center rounded-full"
                            //src={image}
                            alt="Profile image"
                            />
                        </div>
                        <div className="w-1/2 flex justify-between">
                            <p className="text-semibold text-base font-bold">Katty</p>
                        </div>
                        <div>
                            <Link to="/home">
                                <SaveButton text={"Invite"} />
                            </Link>
                        </div>
                    </div> 
                </div>
            </div>

            ini kalo waiting list persetujuan
            <div className="w-auto py-3 px-3 bg-white border-2 border-biruTua rounded-b-md">
                <div className="mt-3 grid grid-cols-1 gap-4">
                    <div className="flex justify-between">
                        <div>
                            <img
                            class="inline object-cover w-24 h-24 items-center justify-center place-self-center rounded-full"
                            //src={image}
                            alt="Profile image"
                            />
                        </div>
                        <div className="w-1/2 flex justify-between">
                            <p className="text-semibold text-base font-bold">Katty</p>
                        </div>
                        <div>
                            <Link to="/home">
                                <CancelButton text={"Invite"} />
                            </Link>
                            <Link to="/home">
                                <SaveButton text={"Invite"} />
                            </Link>
                        </div>
                    </div> 
                </div>
            </div>

            ini kalo waiting list menunggu konfirmasi
            <div className="w-auto py-3 px-3 bg-white border-2 border-biruTua rounded-b-md">
                <div className="mt-3 grid grid-cols-1 gap-4">
                    <div className="flex justify-between">
                        <div>
                            <img
                            class="inline object-cover w-24 h-24 items-center justify-center place-self-center rounded-full"
                            //src={image}
                            alt="Profile image"
                            />
                        </div>
                        <div className="w-1/2 flex justify-between">
                            <p className="text-semibold text-base font-bold">Katty</p>
                        </div>
                        <div>
                            <p className="ml-6 text-semibold text-base font-bold text-gray-600">Waiting . . .</p>
                        </div>
                    </div> 
                </div>
            </div>

            ini kalo no Invitation
            <div className="w-auto py-3 px-3 bg-white border-2 border-biruTua rounded-b-md flex flex-wrap content-center justify-center grid">
                <div className="w-20 h-20 rounded-full bg-gray-400 text-biruTua justify-self-center flex flex-wrap content-center justify-center">
                    {/* <IconPeople width={"40"} height={"40"} /> */}
                </div>
                <p className="text-lg justify-self-center font-semibold">No Invitation</p>
            </div>
        </div>
    </div>
        

                
                    
  );
}
