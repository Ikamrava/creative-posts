import { auth, db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiLaughing } from "react-icons/bs";

function post() {
  const [showEmojis, setShowEmojis] = useState(false);

  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);

    setPost((prev) => ({
      ...prev,
      description: prev.description + emoji,
    }));
  };

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

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
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

  const checkUser = async () => {
    if (loading) return;
    if (!user) {
      route.push("auth/login");
    }

    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className=" my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto ">
      <form>
        {post?.hasOwnProperty("id") ? (
          <h1 className=" text-xl font-bold">Update the post</h1>
        ) : (
          <h1 className=" text-xl font-bold">Create a new post</h1>
        )}

        <div className=" py-2">
          <h3 className=" text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, description: e.target.value }))
            }
            className=" bg-gray-600 h-48 w-full text-white rounded-lg p-2 text-md"
          ></textarea>
          <div className=" flex items-center justify-between">
            <div
              onClick={() => setShowEmojis(!showEmojis)}
              className=" flex gap-3 items-center text-cyan-500 cursor-pointer"
            >
              <BsEmojiLaughing className=" text-lg" />
              <span>Emoji</span>
            </div>
            <p
              className={
                post.description.length > 300 ? " text-red-600" : " text-black"
              }
            >
              {post.description.length}/300
            </p>
          </div>
        </div>

        {showEmojis && <Picker data={data} onEmojiSelect={addEmoji} />}

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
