import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faHeart,
  faComment,
  faBookmark,
  faUserPlus,
  faPaperPlane,
  faCheck,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import "./PostCard.css";

const PostCard = ({ profileName, time, content, imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const imageContainerRef = useRef(null);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { user: profileName, text: comment }]);
      setComment("");
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

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
    <Box className="card">
      <div className="header">
        <div className="profileIcon">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
        <div className="userDetails">
          <div className="userNameAndFollow">
            <h3 className="userName">{profileName}</h3>
            <Button
              className={`followButton ${isFollowing ? "following" : ""}`}
              onClick={handleFollow}
            >
              <FontAwesomeIcon icon={isFollowing ? faCheck : faUserPlus} />{" "}
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
          <p className="time">{time}</p>
        </div>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="image-carousel-container">
        <Flex align="center" justify="center">
          <Button className="carousel-button left" onClick={prevImage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <div className="image-slider">
            <img src={imageUrls[currentIndex]} alt="Post" className="image" />
          </div>
          <Button className="carousel-button right" onClick={nextImage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Flex>
      </div>
      <div className="footer">
        <Button className="button" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} size="1x" /> {likes} Like
          {likes !== 1 ? "s" : ""}
        </Button>
        <Button
          className="button"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <FontAwesomeIcon icon={faComment} /> Comment
        </Button>
        <Button className="button">
          <FontAwesomeIcon icon={faBookmark} /> Bookmark
        </Button>
      </div>
      {showCommentBox && (
        <div className="comment-section">
          <div className="comment-box">
            <input
              type="text"
              className="comment-input"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className="comment-button" onClick={handleCommentSubmit}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
          <div className="comments-list">
            {comments.map((cmt, index) => (
              <div key={index} className="comment-item">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="1x"
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <strong>{cmt.user}</strong>
                  <p>{cmt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Box>
  );
};

export default PostCard;
