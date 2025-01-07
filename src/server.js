const express = require('express');
const app = express();
const port = 3001;  // Backend server port

// Generate mock data for 100 blogs
const generateRandomReviews = (numReviews) => {
  const reviewerNames = ['John Doe', 'Jane Smith', 'Mark Johnson', 'Lucy Brown', 'Tom Lee', 'Emily Clark', 'Michael White', 'Sarah Green', 'David Harris', 'Laura Martinez'];
  const comments = [
    'Great blog! Loved the insights.',
    'Good read, but could use more examples.',
    'Incredible post, very informative.',
    'Decent, but I expected more in-depth analysis.',
    'Nice post, but the layout could be improved.',
    'I did not find this helpful. Needs more context.',
  ];

  const reviews = [];
  for (let i = 0; i < numReviews; i++) {
    const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
    const rating = Math.floor(Math.random() * 5) + 1;  // Random rating between 1 and 5
    const comment = comments[Math.floor(Math.random() * comments.length)];
    reviews.push({ reviewerName, rating, comment });
  }
  return reviews;
};

// Generate mock reviews for 100 blogs
const reviews = [];
for (let i = 1; i <= 100; i++) {
  const numReviews = Math.floor(Math.random() * 5) + 1; // Random number of reviews between 1 and 5
  reviews.push({ blogId: i, reviews: generateRandomReviews(numReviews) });
}

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

// Reviews Endpoint for specific blogId
app.get('/reviews/:blogId', (req, res) => {
  const { blogId } = req.params;
  const blogReviews = reviews.find(review => review.blogId === parseInt(blogId));
  if (blogReviews) {
    res.json(blogReviews.reviews);
  } else {
    res.status(404).json({ message: 'Reviews not found for this blog' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
