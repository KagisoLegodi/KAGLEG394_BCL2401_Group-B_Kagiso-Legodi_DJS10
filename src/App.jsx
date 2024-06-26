// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import errorImage from "./assets/images/error-message.png";

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div style={{ colour: "black", textAlign: "center" }}>
          {" "}
          {error}
          <img
            src={errorImage}
            alt="Errror"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
          {posts.map((post, index) => (
            <li key={post.id}>
              <h2>
                {index + 1}. {post.title}
              </h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default BlogPosts;