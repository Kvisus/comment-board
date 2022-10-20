import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  console.log(user);
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-lg font-medium">Comment Board</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <a
              href=""
              className="py-2 px-4 text-sm bg-cyan-500
                    text-white rounded-lg ml-8"
            >
              Join now
            </a>
          </Link>
        )}
        {user && (
          <div className=" flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm">
                Post
              </button>
            </Link>
            <Link href="/dashboard" className="">
              <div className="w-12 h-12 relative">
                <Image
                  src={user.photoURL}
                  alt="avatar"
                  className="rounded-full cursor-pointer"
                  layout="fill"
                />
              </div>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
