import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Play } from 'lucide-react';

export default function GameFeed() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'games'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const gamesArray = [];
      querySnapshot.forEach((doc) => {
        gamesArray.push({ id: doc.id, ...doc.data() });
      });
      setGames(gamesArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '50vh', color: 'var(--text-secondary)' }}>
        <div className="animate-fade-in">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '8px 0' }}>
      <div style={{ marginBottom: '24px', padding: '0 8px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>Your Games</h1>
      </div>

      {games.length === 0 ? (
        <div className="flex-center" style={{ padding: '48px 16px', flexDirection: 'column', gap: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>No games found. Be the first to add one!</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: '16px',
          padding: '0 8px'
        }}>
          {games.map((game) => (
            <div key={game.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                aspectRatio: '1 / 1', 
                backgroundColor: '#f1f3f4', 
                backgroundImage: game.thumbnail ? `url(${game.thumbnail})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-color)'
              }}>
                {!game.thumbnail && <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>No Image</span>}
              </div>
              <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: 500, 
                  marginBottom: '4px', 
                  color: 'var(--text-primary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {game.title || 'Unknown Game'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px', display: 'block' }}>
                  By {game.addedByName}
                </span>
                <div style={{ marginTop: 'auto' }}>
                  <a 
                    href={game.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn" 
                    style={{ width: '100%', padding: '6px 0', fontSize: '0.8rem', borderRadius: '16px' }}
                  >
                    Play <Play size={14} style={{ marginLeft: '4px' }} fill="currentColor" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 600px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 24px !important;
          }
          h1 { fontSize: '2rem' !important; }
        }
      `}} />
    </div>
  );
}
