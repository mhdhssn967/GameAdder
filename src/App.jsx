import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './pages/Auth';
import GameFeed from './pages/GameFeed';
import AddGame from './pages/AddGame';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="animate-fade-in">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {user && <Navbar user={user} />}
      <div className="container">
        <Routes>
          <Route path="/" element={user ? <GameFeed /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Auth /> : <Navigate to="/" />} />
          <Route path="/add-game" element={user ? <AddGame /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
