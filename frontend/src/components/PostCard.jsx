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
} from "@fortawesome/free-solid-svg-icons";
import "./PostCard.css";

const PostCard = ({ profileName, title, time, content, imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleLike = () => setIsLiked(!isLiked);
  const handleBookmark = () => setIsBookmarked(!isBookmarked);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));

  // Normalize imageUrls to handle both array of strings and array of objects
  const normalizedImageUrls = imageUrls.map((img) =>
    typeof img === "string" ? img : img.url
  );

  // Debugging: Log props to verify title is received
  console.log({ profileName, title, time, content, imageUrls });

  return (
    <article className="post-container">
      <div className="post-card">
        <header className="post-header">
          <div className="profile-wrapper">
            <FontAwesomeIcon icon={faUserCircle} className="profile-avatar" />
            <div className="profile-gradient" />
          </div>
          <div className="user-meta">
            <div className="user-actions">
              <h3 className="username">{profileName}</h3>
              <button
                className={`follow-toggle ${isFollowing ? "followed" : ""}`}
                onClick={handleFollow}
              >
                <FontAwesomeIcon
                  icon={isFollowing ? faCheck : faUserPlus}
                  className="toggle-icon"
                />
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </button>
            </div>
            <time className="post-time">{time}</time>
          </div>
        </header>

        <section className="post-body">
          {/* Display Title with Fallback */}
          {title ? (
            <h2 className="post-title">{title}</h2>
          ) : (
            <h2 className="post-title">No Title Provided</h2> // This shows if title is undefined or missing
          )}

          {/* Render HTML Content */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {normalizedImageUrls.length > 0 && (
            <div className="media-container">
              <div
                className="media-slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {normalizedImageUrls.map((url, idx) => (
                  <div key={idx} className="media-slide">
                    <img
                      src={url}
                      alt={`Post media ${idx + 1}`}
                      className="media-image"
                    />
                  </div>
                ))}
              </div>
              {normalizedImageUrls.length > 1 && (
                <>
                  <button
                    className="nav-arrow prev"
                    onClick={prevImage}
                    disabled={normalizedImageUrls.length === 1}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button
                    className="nav-arrow next"
                    onClick={nextImage}
                    disabled={normalizedImageUrls.length === 1}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                  <div className="media-indicators">
                    {normalizedImageUrls.map((_, idx) => (
                      <span
                        key={idx}
                        className={`indicator ${
                          currentIndex === idx ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        <footer className="post-footer">
          <button
            className={`action-btn ${isLiked ? "active" : ""}`}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faHeart} className="action-icon" />
            <span>Like</span>
          </button>
          <button className="action-btn">
            <FontAwesomeIcon icon={faComment} className="action-icon" />
            <span>Comment</span>
          </button>
          <button
            className={`action-btn ${isBookmarked ? "active" : ""}`}
            onClick={handleBookmark}
          >
            <FontAwesomeIcon icon={faBookmark} className="action-icon" />
            <span>Bookmark</span>
          </button>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;
