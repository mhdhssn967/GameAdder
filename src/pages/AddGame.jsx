import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link2, Image, Type, AlertCircle } from 'lucide-react';

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
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 0' }}>
      <div className="glass" style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Add a New Game</h2>
        <p style={{ opacity: 0.7, marginBottom: '32px' }}>
          Share your favorite web game with the GameFaktory community.
        </p>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '24px', 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, opacity: 0.9 }}>Game Title</label>
            <div style={{ position: 'relative' }}>
              <Type size={18} style={{ position: 'absolute', top: '14px', left: '16px', opacity: 0.5 }} />
              <input 
                type="text" 
                placeholder="e.g., Flappy Bird Clone" 
                className="input-field" 
                style={{ paddingLeft: '44px' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, opacity: 0.9 }}>Game Link (URL)</label>
            <div style={{ position: 'relative' }}>
              <Link2 size={18} style={{ position: 'absolute', top: '14px', left: '16px', opacity: 0.5 }} />
              <input 
                type="url" 
                placeholder="https://..." 
                className="input-field" 
                style={{ paddingLeft: '44px' }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, opacity: 0.9 }}>Thumbnail URL (Optional)</label>
            <div style={{ position: 'relative' }}>
              <Image size={18} style={{ position: 'absolute', top: '14px', left: '16px', opacity: 0.5 }} />
              <input 
                type="url" 
                placeholder="https://.../image.png" 
                className="input-field" 
                style={{ paddingLeft: '44px' }}
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
            <button type="submit" className="btn" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Adding Game...' : 'Submit Game'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/')}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
