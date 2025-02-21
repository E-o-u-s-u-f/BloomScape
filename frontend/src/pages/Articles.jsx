import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";
import "./Articles.css";
import Footer from "../components/Footer";

const articles = [
  {
    id: 1,
    title: "The Art of Bonsai",
    image:
      "https://centredejardinbrossard.com/wp-content/uploads/2021/10/bonsai.jpg",
    description:
      "Learn the ancient techniques of bonsai cultivation and how to care for these miniature trees.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quas temporibus! A consequuntur iste est vitae debitis et necessitatibus distinctio, aperiam rerum illo. Deleniti quam, provident nesciunt minima iure, cupiditate accusamus beatae ea ullam explicabo repudiandae? Velit minima exercitationem laboriosam autem minus ipsum error facere esse ducimus delectus. Placeat veniam mollitia impedit quasi reprehenderit sapiente assumenda hic aliquid cumque ipsa suscipit ratione quis provident, dolorum doloremque omnis porro earum quisquam! Delectus error eligendi doloribus ducimus enim magnam repudiandae mollitia earum reprehenderit est atque nobis ipsum, fugit possimus corrupti saepe ex laborum. Dolorem inventore eos expedita, ullam deserunt ratione porro pariatur?",
    author: "Jane Doe",
    publishedDate: "February 8, 2025",
    tags: ["Bonsai", "Gardening", "Techniques"],
  },
  {
    id: 2,
    title: "10 Essential Gardening Tips",
    image:
      "https://images.cdn-files-a.com/uploads/4677166/2000_62cea95fc3867.png",
    description:
      "Discover the top 10 tips that every gardener should know to keep their plants healthy and thriving.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quas temporibus! A consequuntur iste est vitae debitis et necessitatibus distinctio, aperiam rerum illo. Deleniti quam, provident nesciunt minima iure, cupiditate accusamus beatae ea ullam explicabo repudiandae? Velit minima exercitationem laboriosam autem minus ipsum error facere esse ducimus delectus. Placeat veniam mollitia impedit quasi reprehenderit sapiente assumenda hic aliquid cumque ipsa suscipit ratione quis provident, dolorum doloremque omnis porro earum quisquam! Delectus error eligendi doloribus ducimus enim magnam repudiandae mollitia earum reprehenderit est atque nobis ipsum, fugit possimus corrupti saepe ex laborum. Dolorem inventore eos expedita, ullam deserunt ratione porro pariatur?",
    author: "John Smith",
    publishedDate: "February 7, 2025",
    tags: ["Gardening", "Tips", "Plants"],
  },
  {
    id: 3,
    title: "Indoor Plants That Purify Air",
    image:
      "https://static1.squarespace.com/static/586f1f4d1b631bef52550fa2/59ae84fcd482e948b5a1bae6/6013a86fc49f6c4a0d94fd94/1613435275722/indoor_plant_gudie_soul_travel_ftiness.jpg?format=1500w",
    description:
      "Explore a list of indoor plants that help improve air quality and enhance your home environment.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quas temporibus! A consequuntur iste est vitae debitis et necessitatibus distinctio, aperiam rerum illo. Deleniti quam, provident nesciunt minima iure, cupiditate accusamus beatae ea ullam explicabo repudiandae? Velit minima exercitationem laboriosam autem minus ipsum error facere esse ducimus delectus. Placeat veniam mollitia impedit quasi reprehenderit sapiente assumenda hic aliquid cumque ipsa suscipit ratione quis provident, dolorum doloremque omnis porro earum quisquam! Delectus error eligendi doloribus ducimus enim magnam repudiandae mollitia earum reprehenderit est atque nobis ipsum, fugit possimus corrupti saepe ex laborum. Dolorem inventore eos expedita, ullam deserunt ratione porro pariatur?",
    author: "Emily Johnson",
    publishedDate: "February 6, 2025",
    tags: ["Indoor Plants", "Air Purification", "Home Decor"],
  },
  {
    id: 4,
    title: "Organic Composting Guide",
    image:
      "https://www.alexandriava.gov/sites/default/files/2022-08/AdobeStock_485662119.jpeg",
    description:
      "Step-by-step guide on how to create nutrient-rich compost for your garden using organic waste.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quas temporibus! A consequuntur iste est vitae debitis et necessitatibus distinctio, aperiam rerum illo. Deleniti quam, provident nesciunt minima iure, cupiditate accusamus beatae ea ullam explicabo repudiandae? Velit minima exercitationem laboriosam autem minus ipsum error facere esse ducimus delectus. Placeat veniam mollitia impedit quasi reprehenderit sapiente assumenda hic aliquid cumque ipsa suscipit ratione quis provident, dolorum doloremque omnis porro earum quisquam! Delectus error eligendi doloribus ducimus enim magnam repudiandae mollitia earum reprehenderit est atque nobis ipsum, fugit possimus corrupti saepe ex laborum. Dolorem inventore eos expedita, ullam deserunt ratione porro pariatur?",
    author: "Michael Green",
    publishedDate: "February 5, 2025",
    tags: ["Composting", "Sustainability", "Gardening"],
  },
];

const Articles = () => {
  const navigate = useNavigate();

  const handleClick = (article) => {
    navigate(`/articles/${article.id}`, { state: { article } });
  };

  return (
    <>
      <div className="articles-container">
        <div className="articles-grid">
          {articles.map((article) => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => handleClick(article)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              <h2 className="article-title">{article.title}</h2>
              <p className="article-author">
                By {article.author} | {article.publishedDate}
              </p>
              <p className="article-description">{article.description}</p>
              <div className="article-tags">
                {article.tags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    <Tag size={16} className="tag-icon" />
                    <span className="tag-text">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Articles;
