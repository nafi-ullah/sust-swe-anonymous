import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import imgUser from "../assets/anonymous-user.png";
import imgComment from "../assets/anonymous_comment.png";
import imgbg from "../assets/post-bg.png";

const PostComponent = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [clickable,setClickable] = useState(true);

  const handlePostSubmit = async (e) => {
    setClickable(false);
    e.preventDefault();

    try {
      const response = await fetch("http://swe-ngl-backend.vercel.app/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: postContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to post");
      }

      // Clear the input after successful posting
      setPostContent("");
      setClickable(true);
      // Refresh the posts after posting
      fetchPosts();
    } catch (error) {
      console.error("Error posting:", error.message); // Log error to console
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://swe-ngl-backend.vercel.app/api/post");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      let fetchedPosts = await response.json();
      // Sort posts based on time in descending order (latest first)
      fetchedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const handleCommentSubmit = async (postId) => {
    setClickable(false);
    try {
      const response = await fetch("http://swe-ngl-backend.vercel.app/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postid: postId, comment: commentContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Clear the input after successful posting
      setCommentContent("");
      setClickable(true);
      // Refresh the comments after posting
      fetchComments(postId);
      // Update the post with the new comment count
      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error.message); // Log error to console
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(
        `http://swe-ngl-backend.vercel.app/api/comments?postid=${postId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const fetchedComments = await response.json();
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCommentButtonClick = (postId) => {
    if (selectedPostId !== postId) setSelectedPostId(postId);
    else setSelectedPostId(null);
    fetchComments(postId);
  };

  return (
    <div>
      <div className="relative">
      <img src={imgbg} alt="SWE-20" className="z-0 w-fit" />

      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>

      <div className="absolute top-7/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-1/2 p-4 border border-gray-300 rounded z-10">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="w-full h-24 p-2 mb-2 border border-gray-300 rounded"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          {
            clickable?(
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Post
              </button>
            ):(null)
          }
        </form>
      </div>
    </div>

      <div>
        <h2 className="text-xl font-semibold mt-32 flex justify-center">
          All Posts
        </h2>
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-11/12 md:w-1/2 mx-auto m-4 p-4 border border-gray-300 rounded"
          >
            <div className="flex">
              <img
                src={imgUser}
                alt="user"
                className="w-10 rounded-full border-black border-2 mr-2"
              />
              <div>
                <p className="font-bold">Anonymous Batchmate</p>
                <p className="text-gray-500 text-xs">{post.time}</p>
              </div>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.post}
            </p>
            <div className="flex justify-end">
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold p-px rounded-3xl my-2"
                onClick={() => handleCommentButtonClick(post._id)}
              >
                <p>
                  Comment({post.count})
                  </p>
              </Button>
            </div>
            {selectedPostId === post._id && (
              <div>
                <textarea
                  className="w-full h-24 p-2 mb-2 border border-gray-300 rounded"
                  placeholder="Write your comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                ></textarea>
                {
                  clickable?(
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleCommentSubmit(post._id)}
                    >
                      Submit Comment
                    </button>
                  ):(null)
                }
                <div>
                  {comments && comments.length > 0 ? (
                    <div>
                      <h3>Comments:</h3>
                      {comments.map((comment) => (
                        <div key={comment._id} className="flex m-1">
                          <img
                            src={imgComment}
                            alt="comment"
                            className="w-8 h-8 rounded-full border-black border-2 mr-2"
                          />
                          <div className="bg-slate-300 w-full p-2 rounded-xl">
                            <p>{comment.comment}</p>
                            <p className="text-gray-500 text-xs">
                              {comment.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No Comments available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;
