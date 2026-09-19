import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut, PlusCircle, Gamepad2 } from 'lucide-react';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="navbar glass">
      <Link to="/" className="navbar-brand flex-center" style={{ gap: '8px' }}>
        <Gamepad2 size={28} color="var(--primary-color)" />
        GameFaktory
      </Link>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ opacity: 0.8, fontSize: '0.9rem' }}>
          Hello, <strong>{user?.displayName || 'Gamer'}</strong>
        </span>
        <Link to="/add-game" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <PlusCircle size={18} /> Add Game
        </Link>
        <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--card-border)' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}
