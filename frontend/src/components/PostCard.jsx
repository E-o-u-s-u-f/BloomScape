import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faHeart,
  faComment,
  faBookmark,
  faUserPlus,
  faChevronLeft,
  faChevronRight,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./PostCard.css";

const PostCard = ({ profileName, title, time, content, imageUrls, postId, comments, onLike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments || []);

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(postId);
  };
  const handleBookmark = () => setIsBookmarked(!isBookmarked);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));

  const normalizedImageUrls = imageUrls.map((img) => (typeof img === "string" ? img : img.url));

  // ✅ Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const userId = localStorage.getItem("user"); // ✅ Ensure we get userId
      if (!userId) {
        console.error("No userId found in localStorage");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newComment, userId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error("Failed to add comment");
      }

      const { comment } = await response.json();
      setCommentList((prevComments) => [...prevComments, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // ✅ Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const userId = localStorage.getItem("userId"); // ✅ Ensure consistency
      if (!userId) {
        console.error("No userId found in localStorage");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error("Failed to delete comment");
      }

      setCommentList((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <article className="post-container">
      <div className="post-card">
        <header className="post-header">
          <div className="profile-wrapper">
            <FontAwesomeIcon icon={faUserCircle} className="profile-avatar" />
          </div>
          <div className="user-meta">
            <div className="user-actions">
              <h3 className="username">{profileName}</h3>
              <button className={`follow-toggle ${isFollowing ? "followed" : ""}`} onClick={handleFollow}>
                <FontAwesomeIcon icon={isFollowing ? faCheck : faUserPlus} className="toggle-icon" />
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </button>
            </div>
            <time className="post-time">{time}</time>
          </div>
        </header>

        <section className="post-body">
          <h2 className="post-title">{title || "No Title Provided"}</h2>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />

          {normalizedImageUrls.length > 0 && (
            <div className="media-container">
              <img src={normalizedImageUrls[currentIndex]} alt={`Post media ${currentIndex + 1}`} className="media-image" />
              {normalizedImageUrls.length > 1 && (
                <>
                  <button className="nav-arrow prev" onClick={prevImage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button className="nav-arrow next" onClick={nextImage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}
            </div>
          )}
        </section>

        <footer className="post-footer">
          <button className={`action-btn ${isLiked ? "active" : ""}`} onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} className="action-icon" />
            <span>Like</span>
          </button>
          <button className="action-btn">
            <FontAwesomeIcon icon={faComment} className="action-icon" />
            <span>Comment ({commentList.length})</span>
          </button>
          <button className={`action-btn ${isBookmarked ? "active" : ""}`} onClick={handleBookmark}>
            <FontAwesomeIcon icon={faBookmark} className="action-icon" />
            <span>Bookmark</span>
          </button>
        </footer>

        {/* ✅ Comments Section */}
        <section className="comments-section">
          <h4>Comments</h4>
          <ul className="comment-list">
            {commentList.map((comment) => (
              <li key={comment._id} className="comment-item">
                <span>{comment.text}</span>
                {comment.userId === localStorage.getItem("userId") && (
                  <button className="delete-comment-btn" onClick={() => handleDeleteComment(comment._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="add-comment">
            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </section>
      </div>
    </article>
  );
};

export default PostCard;
