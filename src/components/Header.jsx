import axios from "axios";
import { NavLink } from "react-router";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });

      setUser(null);
      toast.success("Logout successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <img
        className="logo"
        src="/src/assets/Icons/Skull.svg"
        alt="skull"
      />
      <nav>
        <NavLink to="/">Home</NavLink>

        {!user && <NavLink to="/login">Login</NavLink>}

        {!user && <NavLink to="/signup">Signup</NavLink>}

        {user && <NavLink to="/appointments">Appointments</NavLink>}

        {user && (
          <NavLink
            to="/login"
            onClick={logout}
          >
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
