import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function AddGame() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim() || !link.trim()) {
      setError('Title and Link are required.');
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      
      await addDoc(collection(db, 'games'), {
        title: title.trim(),
        link: link.trim(),
        thumbnail: thumbnail.trim() || null,
        addedByUserId: user.uid,
        addedByName: user.displayName || 'Anonymous Gamer',
        createdAt: serverTimestamp()
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to add game. Make sure you have permission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="card" style={{ padding: '32px 24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>Add a New Game</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
          Share your favorite web game with the community.
        </p>

        {error && (
          <div style={{ 
            background: '#fce8e6', 
            color: '#c5221f', 
            padding: '12px', 
            borderRadius: '4px', 
            marginBottom: '24px', 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="input-label">Game Title</label>
            <input 
              type="text" 
              placeholder="e.g., Flappy Bird Clone" 
              className="input-field" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="input-label">Game Link (URL)</label>
            <input 
              type="url" 
              placeholder="https://..." 
              className="input-field" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label className="input-label">Thumbnail URL (Optional)</label>
            <input 
              type="url" 
              placeholder="https://.../image.png" 
              className="input-field" 
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Wait...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
