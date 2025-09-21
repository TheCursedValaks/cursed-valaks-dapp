import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cursed-rituals">Cursed Rituals</Link>
        <Link to="/my-profile">My Profile</Link>
      </div>
      <WalletConnect />
    </nav>
  );
};

export default Navbar;