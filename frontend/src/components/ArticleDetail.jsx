import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";
import "./ArticleDetail.css";
import Footer from "./Footer";

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { article } = location.state || {};

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <>
      <div className="article-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>

        <img
          src={article.image}
          alt={article.title}
          className="article-detail-image"
        />
        <h1 className="article-detail-title">{article.title}</h1>
        <p className="article-detail-author">
          By {article.author} | Published on {article.publishedDate}
        </p>
        <p className="article-detail-content">{article.content}</p>

        {article.tags && (
          <div className="article-tags">
            <h3>Tags:</h3>
            <ul className="tags-list">
              {article.tags.map((tag, index) => (
                <li key={index} className="tag-item">
                  <Tag size={16} className="tag-icon" />
                  <span className="tag-text">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.gallery && (
          <div className="article-gallery">
            <h3>Gallery:</h3>
            <div className="gallery-images">
              {article.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArticleDetail;
