import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/Message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  // ? is user logged?

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  // get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="">
      <h1 className="text-lg italic">Your posts</h1>
      <div className="">
        {posts.map((post) => {
          return (
            <Message key={post.id} {...post}>
              <div className="flex gap-4">
                {/* Delete Button */}
                <button
                  onClick={() => deletePost(post.id)}
                  className="capitalize text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <BsTrash2Fill className="text-2xl" />
                  delete
                </button>
                {/* Edit Button */}
                <Link href={{pathname:'/post',query: post}}>
                  <button className="capitalize text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                    <AiFillEdit className="text-2xl" />
                    edit
                  </button>
                </Link>
              </div>
            </Message>
          );
        })}
      </div>
      <button
        className="font-medium text-white bg-gray-800 py-2 px-4 my-6"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
