import Head from "next/head";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  //* State w all posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const quer = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(quer, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="">
      <Head>
        <title>My own board!</title>
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className="">What other ppl are saying</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={`/${post.id}`}>
              <button>comments</button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
