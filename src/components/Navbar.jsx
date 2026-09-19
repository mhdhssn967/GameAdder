import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Plus, UserCircle, Gamepad2, LogOut } from 'lucide-react';

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
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Gamepad2 size={24} />
        <span style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>GameFaktory</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/add-game" className="btn btn-secondary" style={{ padding: '8px 12px', gap: '4px' }}>
          <Plus size={18} />
          <span className="hide-on-mobile">Add</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px', borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
          <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <UserCircle size={18} />
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {user?.displayName || 'User'}
            </span>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px', border: 'none' }} title="Logout">
            <LogOut size={20} color="var(--text-secondary)" />
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 600px) {
          .hide-on-mobile { display: none !important; }
        }
      `}} />
    </nav>
  );
}
