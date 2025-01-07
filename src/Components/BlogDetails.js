import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa'; // For calendar icon
import './BlogDetails.css';

function BlogDetails() {
  const { id } = useParams(); // Get blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Format date to "Month day, year" as in BlogList.js
  const formatDate = (dateStr) => {
    const datePart = dateStr.split(' ')[0];
    const [day, month, year] = datePart.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    const date = new Date(formattedDate);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Fetch the blog details based on the ID
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.org/posts/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  // Fetch reviews for this blog
  useEffect(() => {
    fetch(`http://localhost:3001/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Reviews Data:', data);  // Log the response data for debugging
        setReviews(data);
      })
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-details">
      <div className="blog-container">
        {/* Blog Image */}
        <div className="blog-image">
          <img src={blog.image} alt={blog.title} />
        </div>

        {/* Blog Content Section */}
        <div className="blog-content">
          <h1>{blog.title}</h1>

          <div className="blog-meta">
            <div className="date">
              <FaCalendarAlt size={18} /> <span>{formatDate(blog.publishedAt)}</span>
            </div>
            <div className="category">
              <span>Category: {blog.category}</span>
            </div>
          </div>

          <p>{blog.content}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h4>{review.reviewerName || 'Anonymous'} ({review.rating} stars)</h4>
              <p>{review.comment || 'No comment available.'}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet for this blog.</p>
        )}
      </div>

      {/* Newsletter Subscription Section */}
      <div className="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default BlogDetails;
