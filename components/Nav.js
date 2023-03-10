import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "react-avatar";

const Nav = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className=" flex justify-between items-center py-10 font-bold">
      <Link href="/">
        <button className=" text-lg font-medium">Be Creative</button>
      </Link>
      <ul className=" flex items-center gap-10 ">
        {!user ? (
          <Link
            href="/auth/login"
            className=" py-2 text-sm bg-cyan-500 px-2 rounded-lg text-white font-medium"
          >
            Join Now
          </Link>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href="/post"
              className=" py-1 text-sm bg-cyan-500 px-2 rounded-md text-white font-medium"
            >
              Send a post
            </Link>
            <Link href="/dashboard" className=" ">
              <Avatar
                src={user.photoURL}
                name={user.displayName}
                round={true}
                size={45}
              ></Avatar>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
