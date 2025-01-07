import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard'; // Assuming BlogCard is a component to render individual blog posts
import { FaSearch } from 'react-icons/fa';
import './BlogList.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dots, setDots] = useState(''); // For animated dots
  const navigate = useNavigate();

 // Format date to "Month day, year"
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

  // Fetch blogs from API
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.org/posts?_page=${page}&_limit=10`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, ...data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger search when magnifying glass icon is clicked
  const triggerSearch = () => {
    // You can add logic to reset the page or perform any search-specific behavior
    console.log('Searching for:', searchTerm); // For debugging, you can log the search term
  };

  // Filter blogs based on title or content
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const scrollThreshold = 100; // Trigger 100px before reaching the bottom

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - scrollThreshold &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  // Add scroll event listener
  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 200); // Debounce to prevent rapid calls
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [handleScroll]);

  // Helper function for debounce
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Animate loading dots
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500); // Update dots every 500ms

      return () => clearInterval(interval); // Cleanup on unmount or when loading stops
    }
  }, [loading]);



  /*console.log(filteredBlogs);  // Debugging line to check filteredBlogs*/

  return (
    <div className="blog-list">
      {/* Search Bar */}
      <div className="header-container">
  <h1 className="header-title">Placeholder Posts</h1>
  <div className="search-container">
    <input
      type="text"
      placeholder="Search ..."
      value={searchTerm}
      onChange={handleSearch}
      className="blog-search-bar"
    />
    <button onClick={triggerSearch} className="search-button">
      <FaSearch size={20} /> {/* Magnifying glass icon */}
    </button>
  </div>
</div>

      <div className="blog-cards">
        {/* Render filtered blogs */}
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              image={blog.image}
              excerpt={blog.content.substring(0, 100)}
              category={blog.category}
              date={formatDate(blog.publishedAt)}
              onReadMore={() => navigate(`/blog/${blog.id}`)}

            />
          ))
        ) : (
          <div className="no-results">No blogs found</div>
        )}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading">
          More posts loading
          {dots}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default BlogList;
