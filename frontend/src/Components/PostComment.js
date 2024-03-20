// import React, { useState } from 'react';

// const PostComponent = () => {
//   const [postContent, setPostContent] = useState('');

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:5000/api/post', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ post: postContent }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to post');
//       }
  
//       // Clear the input after successful posting
//       setPostContent('');
//     } catch (error) {
//       console.error('Error posting:', error.message); // Log error to console
//     }
//   };
  

//   return (
//     <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded">
//       <form onSubmit={handlePostSubmit}>
//         <textarea
//           className="w-full h-24 p-2 mb-2 border border-gray-300 rounded"
//           placeholder="What's on your mind?"
//           value={postContent}
//           onChange={(e) => setPostContent(e.target.value)}
//         ></textarea>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostComponent;
// //hello
import React, { useEffect, useState } from 'react';

const PostComponent = () => {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

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
      let fetchedPosts = await response.json();
      // Sort posts based on time in descending order (latest first)
      fetchedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <div className='flex justify-center' key={post._id}>
            <div className="max-w-md mx-auto mt-4 p-4 border border-gray-300 rounded">
              <p className='font-normal text-gray-700 dark:text-gray-400'>{post.post}</p>
              <p className="text-gray-500 text-sm">{post.time}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;