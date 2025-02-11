import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });

      setUser(null);
      navigate("/");
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

        {user && <NavLink onClick={logout}>Logout</NavLink>}
      </nav>
    </header>
  );
};

export default Header;
