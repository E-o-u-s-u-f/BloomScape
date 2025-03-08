import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { keyword } = useParams();

  const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const options = { month: "short", day: "numeric" };
    return `Posted on ${postDate.toLocaleDateString(undefined, options)}`;
  };

  const handleLike = (postId) => {
    console.log("Liked post:", postId);
  };

  useEffect(() => {
    const url = keyword
      ? `http://localhost:5000/api/multiple/cloud/search?title=${keyword}`
      : `http://localhost:5000/api/multiple/cloud`;

    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(url, { headers })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Raw API response:", data);
        if (!Array.isArray(data)) {
          console.error("Expected an array, got:", data);
          setPosts([]);
          return;
        }

        const approvedPosts = data
          .filter((post) => post.adminStatus === true)
          .map((post) => {
            let formattedTime = "Unknown time";
            if (post.createdAt) formattedTime = timeAgo(post.createdAt);
            else if (post.updatedAt) formattedTime = timeAgo(post.updatedAt);
            return {
              ...post,
              time: formattedTime,
              image: Array.isArray(post.image) ? post.image : [],
              comments: Array.isArray(post.comments) ? post.comments : [],
            };
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(approvedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      });
  }, [keyword]);

  return (
    <>
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {posts.length === 0 ? (
            <p>No approved posts available.</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                profileName={post.profileName}
                title={post.title}
                time={post.time}
                content={post.content}
                imageUrls={post.image.map((img) => img.url || "")}
                postId={post._id}
                comments={post.comments}
                onLike={() => handleLike(post._id)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;