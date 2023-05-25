import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home Page</Link>
      <span className="nav-divider">|</span>
      <Link to="/profile" className="nav-link">Your Profile</Link>
      <span className="nav-greeting">Welcome, {user.name}</span>
      <Link to="/" onClick={handleLogOut} className="nav-link logout">Log Out</Link>
    </nav>
  );
}
