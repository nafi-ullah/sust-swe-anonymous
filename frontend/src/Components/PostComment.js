
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Card } from 'flowbite-react';

const PostComponent = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: postContent }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post');
      }
  
      // Clear the input after successful posting
      setPostContent('');
      // Refresh the posts after posting
      fetchPosts();
    } catch (error) {
      console.error('Error posting:', error.message); // Log error to console
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/post');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await fetch('http://localhost:5000/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postid: postId, comment: commentContent }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
  
      // Clear the input after successful posting
      setCommentContent('');
      // Refresh the comments after posting
      fetchComments(postId);
    } catch (error) {
      console.error('Error posting comment:', error.message); // Log error to console
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments?postid=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const fetchedComments = await response.json();
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCommentButtonClick = (postId) => {
    setSelectedPostId(postId);
    fetchComments(postId);
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="w-full h-24 p-2 mb-2 border border-gray-300 rounded"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Post
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8 flex justify-center">All Posts</h2>
        {posts.map(post => (
          <div key={post._id} className="max-w-md mx-auto mt-4 p-4 border border-gray-300 rounded">
            <p className='font-normal text-gray-700 dark:text-gray-400'>{post.post}</p>
            <p className="text-gray-500 text-sm">{post.time}</p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleCommentButtonClick(post._id)}>Comment</Button>
            {selectedPostId === post._id && (
              <div>
                <textarea
                  className="w-full h-24 p-2 mb-2 border border-gray-300 rounded"
                  placeholder="Write your comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                ></textarea>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleCommentSubmit(post._id)}>Submit Comment</button>
                <div>
                  <h3>Comments:</h3>
                  {comments.map(comment => (
                    <div key={comment._id}>
                      <p>{comment.comment}</p>
                      <p>{comment.time}</p>
                    </div>
                  ))}
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
