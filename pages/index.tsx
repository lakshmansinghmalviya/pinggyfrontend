import React, { useState } from "react";
import { PostForm } from "@/components/PostForm";
import { PostList } from "@/components/PostList";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    const handlePostCreated = () => {
        setRefresh((prev) => !prev); // Toggle refresh state
    };

    return (
        <div className="container mx-auto p-6">
             <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Hi, Welcome to Pinggy!</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="py-2 px-6 bg-gray-500 text-white font-bold uppercase rounded-md shadow-md hover:bg-gray-700"
                >
                    Create Post
                </button>
            </div>
            <PostForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPostCreated={handlePostCreated} />

            {/* Refresh Post List on new post creation */}
            <PostList key={refresh ? "refresh-1" : "refresh-2"} />
        </div>
    );
}
