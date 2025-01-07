import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import BlogList from './Components/BlogList';
import BlogDetails from './Components/BlogDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
