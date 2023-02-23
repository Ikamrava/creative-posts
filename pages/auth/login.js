import { Divider } from "@material-ui/core";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

function login() {
  const googleProvider = new GoogleAuthProvider();
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className=" shadow-xl mt-32 p-10 text-gray-700 rounded-lg ">
      <h2 className=" text-2xl font-medium mb-4">Join Today</h2>
      <div className="  bg-gray-700 max-w-xs flex items-center justify-center rounded-lg m-auto ">
        <FcGoogle size={30} />
        <button
          onClick={GoogleLogin}
          className=" text-white font-medium  flex align-middle p-4"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default login;
