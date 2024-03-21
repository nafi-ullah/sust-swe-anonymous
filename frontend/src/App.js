import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./Components/Login";
import PostComponent from "./Components/PostComment";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (username, password) => {
    
    if (username === 'SWE-20' && password === ':werocks') {
      console.log('Login successful');
      setLoggedIn(true); 
      setError(''); 
    } else {
      console.log('Invalid credentials');
      setError('Invalid username or password');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login loggedIn={loggedIn} onLogin={handleLogin} error={error} />}
        />
        <Route
          path="/post"
          element={loggedIn ? <PostComponent /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
