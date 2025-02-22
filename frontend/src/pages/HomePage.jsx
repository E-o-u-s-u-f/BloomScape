import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import "../App.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { keyword } = useParams(); // Get keyword from the URL

  useEffect(() => {
    // Determine the URL to fetch based on whether keyword exists
    const url = keyword
      ? `http://localhost:5000/api/multiple/cloud/search?title=${keyword}` 
      : `http://localhost:5000/api/multiple/cloud`; 

    // Fetch posts from the backend
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
      
        const approvedPosts = data.filter((post) => post.adminStatus === true);

        if (approvedPosts.length === 0) {
          setPosts([]); 
        } else {
          setPosts(approvedPosts); 
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]); 
      });
  }, [keyword]); 

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {posts.length === 0 ? (
          <p>No approved posts available.</p> 
        ) : (
          posts.map((post, index) => (
            <PostCard
              key={index}
              profileName={post.profileName}
              time="Just now"
              content={post.content}
              imageUrl={post.image[0]?.url}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
