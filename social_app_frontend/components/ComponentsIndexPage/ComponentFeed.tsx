import { useMount } from "@reactuses/core";
import { useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";

import { useAuth } from "@/context/AuthContext";
import ComponentPublicacion from "@/components/ComponetsFeed/ComponentPublicacion";
import { Post, ResultsPosts } from "@/interface/interfaces";
import ComponentPosts from "@/components/ComponetsFeed/ComponentPosts";

export default function ComponentFeed() {
  const { user } = useAuth();

  const [posts, setPosts] = useState<ResultsPosts[]>([]);
  const [newPosts, setNewPosts] = useState([]);

  useMount(async () => {
    try {
      const response = await axios.get<Post>(
        "http://localhost:8000/rest/v1/posts/",
        {
          headers: {
            Authorization: "Bearer " + user?.accessToken,
          },
        },
      );

      if (response.status === 200) {
        const fetchedPosts = response.data.results;

        setPosts(fetchedPosts);
      }
    } catch (error) {
      await signOut({ redirect: false, callbackUrl: "/" });
    }
  });

  return (
    <main className={"flex flex-col gap-8"}>
      <section className={"flex flex-col w-full"}>
        <ComponentPublicacion setNewPosts={setNewPosts} />
      </section>
      <section className={"flex flex-col gap-8"}>
        {[...newPosts, ...posts].map((post, index) => {
          return (
            <ComponentPosts
              key={index}
              author_email={post.author_email}
              author_photo={post.author_photo}
              author_username={post.author_username}
              author_uuid={post.author_uuid}
              comments={post.comments}
              content={post.content}
              likes={post.likes}
              title={post.title}
            />
          );
        })}
      </section>
    </main>
  );
}
