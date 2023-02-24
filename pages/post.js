import { auth, db } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { RouteHandlerManager } from "next/dist/server/future/route-handler-managers/route-handler-manager";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

function post() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const submitPost = async (event) => {
    event.preventDefault();

    if (!post.description) {
      toast.error("Description field is empty", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post.description.length > 300) {
      toast.error("Description is too long");
      return;
    }

    const collectionRef = collection(db, "posts");
    try {
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        userID: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });

      return route.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto ">
      <form>
        <h1 className=" text-xl font-bold">Create a new post</h1>
        <div className=" py-2">
          <h3 className=" text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, description: e.target.value }))
            }
            className=" bg-gray-600 h-48 w-full text-white rounded-lg p-2 text-md"
          ></textarea>
          <p
            className={
              post.description.length > 300 ? " text-red-600" : " text-black"
            }
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          onClick={submitPost}
          className={" w-full bg-cyan-600 rounded-lg text-white py-2"}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default post;
