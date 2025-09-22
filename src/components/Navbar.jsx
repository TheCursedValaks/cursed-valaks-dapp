import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from './Button';

const Navbar = () => {
  const { publicKey, connect, disconnect, connecting, select, wallets, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [error, setError] = React.useState(null);

  const handleConnect = async () => {
    try {
      console.log('Wallets detected in Navbar:', wallets.map(w => w?.name || 'undefined'));
      if (wallets.length > 0 && wallets[0]?.adapter && !publicKey) {
        setVisible(true);
        await select(wallets[0].adapter.name); // Select Phantom
        await connect(); // Attempt connection
      } else if (!publicKey && !wallet) {
        setError('No wallet detected. Please install Phantom.');
      }
      setError(null);
    } catch (err) {
      setError(`Connection failed: ${err.message}`);
      console.error('Connection error:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setError(null);
    } catch (err) {
      setError(`Disconnect failed: ${err.message}`);
      console.error('Disconnect error:', err);
    }
  };

  return (
    <nav>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/cursed-lock">Cursed Lock</a>
        <a href="/cursed-rituals">Cursed Rituals</a>
        <a href="/my-profile">My Profile</a>
      </div>
      <div className="wallet-section">
        {!publicKey ? (
          <Button onClick={handleConnect} disabled={connecting}>
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#ff0000', fontFamily: 'Creepster, cursive', fontSize: '18px' }}>
              Connected: {publicKey.toString().slice(0, 8)}...
            </span>
            <Button onClick={handleDisconnect} className="cursed-btn">
              Disconnect
            </Button>
          </div>
        )}
        {error && <p style={{ color: '#ff0000' }}>{error}</p>}
      </div>
    </nav>
  );
};

export default Navbar;