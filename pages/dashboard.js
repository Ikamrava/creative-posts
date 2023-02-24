import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Message from "@/components/Message";

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
  return (
    <div>
      <h1>Your Posts</h1>
      <div>Posts</div>
      {allposts.map((post) => (
        <Message {...post} />
      ))}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
