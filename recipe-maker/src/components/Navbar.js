import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Ensure this path is correct

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // This is how you consume the context

  const handleLogout = () => {
    setUser(null); // Clear the user from context on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <nav>
        {/* Display user ID here if user is logged in */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          {user ? (
            // Show logout and user ID if user is logged in
            <>
              <li>
                Username: {user.username} UserID: {user.id}
              </li>{" "}
              {/* Display user ID here */}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            // Show login/register if user is not logged in
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
