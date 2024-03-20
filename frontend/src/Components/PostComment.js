import React, { useState } from 'react';

const PostComponent = () => {
  const [postContent, setPostContent] = useState('');

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
    } catch (error) {
      console.error('Error posting:', error.message); // Log error to console
    }
  };
  

  return (
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
  );
};

export default PostComponent;
//hello