import { useMount } from "@reactuses/core";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ComponentPublicacion from "@/components/ComponetsFeed/ComponentPublicacion";
import axios from "axios";
import { Post, ResultsPosts } from "@/interface/interfaces";
import { signOut } from "next-auth/react";
import ComponentPosts from "@/components/ComponetsFeed/ComponentPosts";

export default function ComponentFeed() {

  const { user } = useAuth()

  const [ posts, setPosts ] = useState<ResultsPosts[]>([]);


  useMount(async () => {
    try {
      const response = await axios.get<Post>('http://localhost:8000/rest/v1/posts/', {
        headers: {
          'Authorization': 'Bearer ' + user?.accessToken,
        }
      })

      if (response.status === 200) {
        const fetchedPosts = response.data.results;
        setPosts(fetchedPosts);
      }
    } catch(error) {
      console.error('Error fetching posts:', error);
      await signOut({ redirect: false, callbackUrl: "/" });
    }
  });

  return (
    <main className={"flex flex-col gap-8"}>
      <section className={"flex flex-col w-full"}>
        <ComponentPublicacion />
      </section>
      <section>
        <ComponentPosts/>
      </section>
    </main>
  )
}
