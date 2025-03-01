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
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import "./PostCard.css";

const PostCard = ({ profileName, time, content, imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card">
      <div className="header">
        <div className="profileIcon">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
        <div className="userDetails">
          <div className="userNameAndFollow">
            <h3 className="userName">{profileName}</h3>
            <button
              className={`followButton ${isFollowing ? "following" : ""}`}
              onClick={handleFollow}
            >
              <FontAwesomeIcon icon={isFollowing ? faCheck : faUserPlus} />
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          <p className="time">{time}</p>
        </div>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      {imageUrls.length > 0 && (
        <div className="image-carousel">
          <button className="carousel-button left" onClick={prevImage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <img src={imageUrls[currentIndex]} alt="Post" className="image" />
          <button className="carousel-button right" onClick={nextImage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
      <div className="footer">
        <button className="button">
          <FontAwesomeIcon icon={faHeart} /> Like
        </button>
        <button className="button">
          <FontAwesomeIcon icon={faComment} /> Comment
        </button>
        <button className="button">
          <FontAwesomeIcon icon={faBookmark} /> Bookmark
        </button>
      </div>
    </div>
  );
};

export default PostCard;
