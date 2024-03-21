import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./Components/Login";
import PostComponent from "./Components/PostComment";

function App() {
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [error, setError] = useState('');

  const handleLogin = (username, password) => {
    if (username === 'SWE-20' && password === ':werocks') {
      console.log('Login successful');
      setLoggedIn(true);
      setError('');
      
      localStorage.setItem('loggedIn', 'true');
    } else {
      console.log('Invalid credentials');
      setError('Invalid username or password');
    }
  };

  
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  useEffect(() => {
    
    if (!loggedIn && window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }, [loggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login loggedIn={loggedIn} onLogin={handleLogin} error={error} />}
        />
        <Route
          path="/post"
          element={loggedIn ? <PostComponent onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
