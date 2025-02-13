import axios from "axios";
import { NavLink, Link } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });

      setUser(null);
      setNavOpen(false);
      toast.success("Logout successful");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleNavCollapse = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <img
        className="logo"
        src="/src/assets/Icons/Skull.svg"
        alt="skull"
      />
      <nav className={`${navOpen ? "visible p-4" : "invisible"}`}>
        <NavLink
          to="/"
          onClick={() => setNavOpen(false)}
        >
          Home
        </NavLink>

        {!user && (
          <NavLink
            to="/login"
            onClick={() => setNavOpen(false)}
          >
            Login
          </NavLink>
        )}

        {!user && (
          <NavLink
            to="/signup"
            onClick={() => setNavOpen(false)}
          >
            Signup
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/appointments"
            onClick={() => setNavOpen(false)}
          >
            Appointments
          </NavLink>
        )}

        {user && <Link onClick={logout}>Logout</Link>}
      </nav>
      <button onClick={toggleNavCollapse}>
        <hr />
        <hr />
        <hr />
      </button>
    </header>
  );
};

export default Header;
