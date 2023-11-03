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
    <div
      style={{
        marginBottom: "20px",
        backgroundColor: "#333",
        padding: "10px 0",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "center",
            padding: "0",
          }}
        >
          <li style={{ margin: "0 15px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
          <li style={{ margin: "0 15px" }}>
            <Link
              to="/favorites"
              style={{ textDecoration: "none", color: "white" }}
            >
              Favorites
            </Link>
          </li>
          {user ? (
            <>
              <li style={{ margin: "0 15px", color: "lightgrey" }}>
                Username: {user.username}
              </li>
              <li style={{ margin: "0 15px" }}>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li style={{ margin: "0 15px" }}>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </li>
              <li style={{ margin: "0 15px" }}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
