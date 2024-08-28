import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from './components/Register';
import Login from './components/Login';
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BookDetail from "./components/BookDetail";

function App() {
  const cardsRef = useRef(null);
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div>
        <Navbar scrollToFooter={scrollToFooter} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero scrollToCards={scrollToCards} />         
              <Newsletter />
              <div ref={cardsRef}>
                
              </div>
              <Footer />
            </>
          } />
          <Route path="/books" element={isAuthenticated ? <BookList /> : <Navigate to="/login" />} />
          <Route path="/books/add" element={isAuthenticated ? <BookForm /> : <Navigate to="/login" />} />
          <Route path="/books/:id" element={isAuthenticated ? <BookDetail /> : <Navigate to="/login" />} />
          <Route path="/books/edit/:id" element={isAuthenticated ? <BookForm /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
