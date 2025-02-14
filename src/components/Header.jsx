import axios from "axios";
import { NavLink, Link } from "react-router";
import { useContext, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import UserContext from "../contexts/UserContext";
import AppointmentContext from "../contexts/AppointmentContext";
import toast from "react-hot-toast";
// import handleError from "../utils/handleError";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { setAppointments } = useContext(AppointmentContext);
  const [navOpen, setNavOpen] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });

      setUser(null);
      setAppointments([]);
      setNavOpen(false);
      toast.success("Logout successful");
    } catch (err) {
      // const error = handleError(err);
      showBoundary(err);
    }
  };

  const toggleNavCollapse = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <img className="logo" src="/src/assets/Icons/Skull.svg" alt="skull" />
        <nav className={`${navOpen ? "visible p-4" : "invisible"}`}>
          <NavLink to="/" onClick={() => setNavOpen(false)}>
            Home
          </NavLink>

          {!user && (
            <NavLink to="/login" onClick={() => setNavOpen(false)}>
              Login
            </NavLink>
          )}

          {!user && (
            <NavLink to="/signup" onClick={() => setNavOpen(false)}>
              Signup
            </NavLink>
          )}

          {user && (
            <NavLink to="/appointments" onClick={() => setNavOpen(false)}>
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
      </div>
    </header>
  );
};

export default Header;
