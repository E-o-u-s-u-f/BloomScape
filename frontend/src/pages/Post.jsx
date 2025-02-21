import React, { useState, useRef } from "react";
import "./Post.css";
import { FaImage, FaSmile } from "react-icons/fa";
import Picker from "emoji-picker-react";

export default function Post() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleEmojiClick = (emojiObject, event) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Post Created Successfully!");
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Create Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          {image && <img src={image} alt="Preview" className="post-image" />}
          <div className="post-options">
            <div className="post-buttons">
              <button
                type="button"
                className="post-photo"
                onClick={() => fileInputRef.current.click()}
              >
                <FaImage /> Photo/Video
              </button>
              <button
                type="button"
                className="post-feeling"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaSmile /> Feeling/Activity
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          <button type="submit" className="post-submit" disabled={!content}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
