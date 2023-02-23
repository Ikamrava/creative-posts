import { Divider } from "@material-ui/core";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function login() {
  return (
    <div className=" shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className=" text-2xl font-medium mb-4">Join Today</h2>
      <div className="  bg-gray-700 max-w-xs flex items-center justify-center rounded-lg ">
        <FcGoogle size={30} />
        <button className=" text-white font-medium  flex align-middle p-4">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default login;
