import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faHeart,
  faComment,
  faBookmark,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./PostCard.css";

const PostCard = ({ profileName, time, content, imageUrl }) => {
  return (
    <div className="card">
      <div className="header">
        <div className="profileIcon">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
        <div className="userDetails">
          <div className="userNameAndFollow">
            <h3 className="userName">{profileName}</h3>
            <button className="followButton">
              <FontAwesomeIcon icon={faUserPlus} />
              Follow
            </button>
          </div>
          <p className="time">{time}</p>
        </div>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      <img src={imageUrl} alt="Post" className="image" />
      <div className="footer">
        <button className="button">
          <FontAwesomeIcon icon={faHeart} size="1x" /> Like
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
