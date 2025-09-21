import { useWallet } from '@solana/wallet-adapter-react';

const MyProfile = () => {
  const { connected, publicKey } = useWallet();

  if (!connected) return <p className="container">Please connect your wallet.</p>;

  return (
    <div className="container">
      <h1>My Profile</h1>
      <p><span style={{ color: '#ff0000' }}>Wallet Address:</span> <span style={{ color: '#ffffff' }}>{publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</span></p>
      <p><span style={{ color: '#ff0000' }}>NFT Holdings and Avatar:</span> <span style={{ color: '#ffffff' }}>Will display here when minted!</span></p>
      <p><span style={{ color: '#ff0000' }}>SpectraX Token Balance:</span> <span style={{ color: '#ffffff' }}>Coming soon...</span></p>
    </div>
  );
};

export default MyProfile;