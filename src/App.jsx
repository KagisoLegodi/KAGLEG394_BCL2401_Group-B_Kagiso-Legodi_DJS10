import React, { useState,useEffect } from "react"
import errorImage from "/images/error-message.png"

function BlogPosts () {
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          //"https://jsonplaceholder.typicode.com/postsss"// uncomment  this API address to toggle Error response
         "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          const errorData = await response.json(); // Try to extract error details
          throw new Error(errorData.message || " ");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);


}

export default BlogPosts;