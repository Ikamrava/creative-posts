import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { async } from "@firebase/util";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
  };

  useEffect(() => {
    getData();
  }, [user, loading]);
  return (
    <div>
      <h1>Your Posts</h1>
      <div>Posts</div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
