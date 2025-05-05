import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user.roles.includes("ROLE_ADMIN") && <Link to="/admin">Admin</Link>}
            {user.roles.includes("ROLE_MODERATOR") && (
              <Link to="/moderator">Moderator</Link>
            )}
            <Link to="/user">User</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;