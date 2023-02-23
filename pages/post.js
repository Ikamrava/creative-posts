import { auth, db } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function post() {
  const [post, setPost] = useState({ description: "" });
  const submitPost = async (e) => {
    e.preventDefault();
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
          onSubmit={submitPost}
          type="submit"
          className={
            post.description.length > 300
              ? " hidden"
              : " w-full bg-cyan-600 rounded-lg text-white py-2"
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default post;
