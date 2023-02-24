import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Message from "@/components/Message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const collectionRef = collection(db, "posts");
  const [allposts, setAllPosts] = useState([]);

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    if (user) {
      const q = query(collectionRef, orderBy("timestamp", "desc"));

      const onsubscribe = onSnapshot(q, (snapshot) => {
        setAllPosts(
          snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .filter((item) => item.userID === user.uid)
        );
      });
      return onsubscribe;
    }
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="">
      <h1 className=" font-bold">Your Posts</h1>
      <h2 className=" text-sm my-5">You have {allposts.length} posts</h2>

      {allposts.map((post) => (
        <Message {...post} key={post.id}>
          <div className=" flex gap-8 items-center ">
            <button
              onClick={() => deletePost(post.id)}
              className=" text-purple-600 flex items-center justify-center gap-2 py-2 text-sm"
            >
              <BsTrash2Fill className=" text-xl" /> Delete
            </button>
            <Link href={{ pathname: "/post", query: post }}>
              <button className=" text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                {" "}
                <AiFillEdit className=" text-xl" /> Edit
              </button>
            </Link>
          </div>
        </Message>
      ))}
      <button
        className=" mt-5 bg-black px-4 py-1 rounded-md text-white font-bold"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
