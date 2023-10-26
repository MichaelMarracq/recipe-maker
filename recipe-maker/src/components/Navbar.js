import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { checkUserStatus } from './api';

const Navbar = () => {
  const history = useHistory();

  const handleLogout = async () => {
    // Log the user out by making a request to the logout route
    await fetch('/api/logout', { method: 'GET' });
    // Check if the user is no longer logged in
    const user = await checkUserStatus();
    if (!user) {
      // Redirect the user to the home page or another appropriate location
      history.push('/');
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
