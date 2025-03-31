import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const path = "https://pinggybackend-42gaalhty-lslakshman2024-gmailcoms-projects.vercel.app/";
      const lpath = "http://localhost:8080/";
      const response = await fetch(path+"list", {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "PinggyAuthHeader": "authCode",
        }
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      debugger
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4 grid gap-4">
        {posts.map((post, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
