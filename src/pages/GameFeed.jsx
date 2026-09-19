import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { ExternalLink, User } from 'lucide-react';

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
      <div className="flex-center" style={{ height: '50vh' }}>
        <div className="animate-fade-in">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Game Library</h1>
          <p style={{ opacity: 0.7 }}>Discover and play web games added by the community.</p>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="glass flex-center" style={{ padding: '64px', flexDirection: 'column', gap: '16px', opacity: 0.8 }}>
          <p>No games added yet. Be the first to add one!</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {games.map((game) => (
            <div key={game.id} className="glass" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                height: '160px', 
                backgroundColor: 'rgba(0,0,0,0.3)', 
                backgroundImage: game.thumbnail ? `url(${game.thumbnail})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {!game.thumbnail && <span style={{ opacity: 0.5 }}>No Thumbnail</span>}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,1), rgba(15,23,42,0))',
                  opacity: 0.7
                }} />
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', wordBreak: 'break-word' }}>
                  {game.title || 'Untitled Game'}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7, fontSize: '0.85rem', marginBottom: '20px' }}>
                  <User size={14} />
                  <span>Added by <strong>{game.addedByName}</strong></span>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <a 
                    href={game.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary" 
                    style={{ width: '100%', fontSize: '0.9rem' }}
                  >
                    Play Game <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
