import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const CursedLock = () => {
  const { publicKey } = useWallet();
  const [missions, setMissions] = useState([]);
  const adminWallet = '2eB6wzNbNgFJgzKefzz62ytWowxFTdd3ogbT4KRWkuhj';

  useEffect(() => {
    setMissions([
      { id: 1, title: 'Summon the Valak', reward: '100 Cursed Tokens', completed: false },
      { id: 2, title: 'Dark Ritual', reward: '50 Cursed Tokens', completed: false },
      { id: 3, title: 'Blood Offering', reward: '75 Cursed Tokens', completed: false },
      { id: 4, title: 'Shadow Pact', reward: '25 Cursed Tokens', completed: false },
      { id: 5, title: 'Cursed Chant', reward: '150 Cursed Tokens', completed: false },
    ]);
  }, []);

  const handleGetCursed = (missionId) => {
    setMissions(missions.map(mission =>
      mission.id === missionId ? { ...mission, completed: true } : mission
    ));
    alert(`Mission ${missionId} completed! Reward: ${missions.find(m => m.id === missionId).reward} (Mock transaction)`);
  };

  return (
    <div className="cursed-lock-layout">
      <div className="container">
        <h1>Cursed Lock Missions</h1>
        {publicKey ? (
          <>
            <div className="mission-grid" style={{ display: 'grid', gap: '20px', margin: '20px 0' }}>
              {missions.map((mission) => (
                <div key={mission.id} className="mission-panel" style={{ padding: '15px', border: '1px solid #ff0000', textAlign: 'center', background: 'rgba(26, 26, 26, 0.8)', color: '#ff0000' }}>
                  <h3>{mission.title}</h3>
                  <p>Reward: {mission.reward}</p>
                  <Button
                    onClick={() => handleGetCursed(mission.id)}
                    disabled={mission.completed}
                    className="cursed-btn"
                  >
                    {mission.completed ? 'Completed' : 'Get Cursed'}
                  </Button>
                </div>
              ))}
            </div>
            {publicKey.toString() === adminWallet && (
              <Button className="admin-btn">Admin Panel</Button>
            )}
          </>
        ) : (
          <p>Please connect your wallet to access missions. <Link to="/" style={{ color: '#ff0000' }}>Go Back</Link></p>
        )}
      </div>
    </div>
  );
};

export default CursedLock;