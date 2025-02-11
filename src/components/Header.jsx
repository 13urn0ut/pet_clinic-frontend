import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <img
        className="logo"
        src="/src/assets/Icons/Skull.svg"
        alt="skull"
      />
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </nav>
    </header>
  );
};

export default Header;
