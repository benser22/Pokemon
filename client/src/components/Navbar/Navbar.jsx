import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import logo from "../../assets/images/pokeBall.gif"

const Navbar = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    // dispatch(restorePokemons());
  };

  return (
    <nav className={styles.container}>
      <div>
        <Link to='/home' title="Back to Home">
          <img src={logo} alt='logo' className={styles.logo} />
        </Link>
      </div>
      <Link to='/pokemons' style={{ textDecoration: 'none', color: 'black' }}>
        <div className={styles.links} onClick={handleReset}>
          <p>xxxxxxxxxxxxxxxx</p>
        </div>
      </Link>
      <Link to='/create' style={{ textDecoration: 'none', color: 'black' }}>
        <div className={styles.links}>
          <p>Create Pokemon</p>
        </div>
      </Link>
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <div className={styles.links}>
          <p>Logout</p>
        </div>
      </Link>

    </nav>
  );
};

export default Navbar;
