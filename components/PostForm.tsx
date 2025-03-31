import React, { useState } from "react";

interface PostFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPostCreated: () => void;  // Add callback to refresh posts
}

export const PostForm: React.FC<PostFormModalProps> = ({ isOpen, onClose, onPostCreated }) => {
    const [postTitle, setPostTitle] = useState<string>("");
    const [postBody, setPostBody] = useState<string>("");
    const [authCode, setAuthCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!postTitle || !postBody || !authCode) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        console.log(postTitle + "  " + postBody + "   " + authCode);
        console.log(JSON.stringify({ title: postTitle, body: postBody }));
        try {

            const response = await fetch("http://localhost:8080/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "PinggyAuthHeader": authCode,
                },
                body: JSON.stringify({ title: postTitle, body: postBody }),
            });
            if (!response.ok) {
                throw new Error("Failed to submit post.");
            }
            debugger
            const data = await response.json();
            console.log(data);
            alert("Post submitted successfully!");
            setPostTitle("");
            setPostBody("");
            setAuthCode("");
            onClose();
            onPostCreated();
        } catch (err) {
            setError((err as Error).message);
        }

        setLoading(false);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a Post</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">Post Title:</label>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-700 shadow-sm"
                            placeholder="Enter post title"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-700">Post Body:</label>
                        <textarea
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-800"
                            placeholder="Enter post body"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-700">Auth Code:</label>
                        <input
                            type="text"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-800"
                            placeholder="Enter Auth Code"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="py-2 px-6 bg-blue-600 text-white font-bold uppercase rounded-md shadow-md hover:bg-blue-500 transition-all"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
