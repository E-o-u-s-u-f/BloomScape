import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import "../App.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/multiple/cloud")  // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {posts.map((post, index) => (
          <PostCard
            key={index}
            profileName={post.profileName}
            time="Just now"  // You may need to adjust this
            content={post.content}
            imageUrl={post.image[0]?.url}  // Use the first image URL
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
