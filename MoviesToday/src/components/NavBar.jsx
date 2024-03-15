import React from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.isActive : "")}
              to="/"
            >
              SearchMovies
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.isActive : "")}
              to="favourites"
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
