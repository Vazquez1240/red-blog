import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import ComponentPublicacion from "@/components/ComponetsFeed/ComponentPublicacion";
import { Post, ResultsPosts } from "@/interface/interfaces";
import ComponentPosts from "@/components/ComponetsFeed/ComponentPosts";
import PostCardSkeleton from "@/components/ComponetsFeed/PostCardSkeleton";

export default function ComponentFeed() {
  const { user } = useAuth();

  const [posts, setPosts] = useState<ResultsPosts[]>([]);
  const [newPosts, setNewPosts] = useState<ResultsPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post>(
          "http://localhost:8000/rest/v1/posts/",
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setPosts(response.data.results);
        }
      } catch (error) {
        await signOut({ redirect: false, callbackUrl: "/" });
      }
    };

    fetchPosts();
  }, [user?.accessToken]);

  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col w-full">
        <ComponentPublicacion setNewPosts={setNewPosts} />
      </section>
      <section className="flex flex-col gap-8">
        {isLoading ? (
          []
        ) : (
          [...newPosts, ...posts].map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ComponentPosts {...post} />
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
}
