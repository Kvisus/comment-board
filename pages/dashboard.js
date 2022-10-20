import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  // ? is user logged?

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
  };

  // get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="">
      <h1 className="">Your posts</h1>
      <div className="">posts</div>
      <button className="" onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
}
