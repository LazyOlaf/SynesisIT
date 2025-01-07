import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; // Calendar icon from react-icons
import './BlogCard.css';

const BlogCard = ({ title, image, excerpt, category, date, onReadMore }) => {
  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-card-image" />
      
      <div className="blog-card-info">
        {/* Date on the left, Category on the right */}
        <div className="blog-card-date">
          <FaCalendarAlt className="calendar-icon" />
          {date}
        </div>
        <div className="blog-card-category">{category}</div>
      </div>

      <div className="blog-card-content">
        <h2 className="blog-card-title">{title}</h2>
        <p className="blog-card-excerpt">{excerpt}...</p>
        <div className="blog-card-buttons">
          <button onClick={onReadMore}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
