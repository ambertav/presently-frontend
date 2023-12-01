import React from "react";
import { NavLink } from "react-router-dom";

import Profile from '../../assets/footerIcons/profile.png'
import Home from '../../assets/footerIcons/home.png'
import Calender from '../../assets/footerIcons/calender.png'
import Alert from '../../assets/footerIcons/alert.png'
// import Gift from '../../assets/footerIcons/gift.png'

import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles["footer-container"]}>
      <NavLink className={styles["link"]} to="/friends">
        <div className={styles["icon"]}>
          <img src={Home} alt="home" />
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink className={styles["link"]} to="/">
        <div className={styles["icon"]}>
          <img src={Alert} alt="bell" />
          <p>Reminders</p>
        </div>
      </NavLink>
      <NavLink className={styles["link"]} to="/">
        <div className={styles["icon"]}>
          <img src={Calender} alt="a calendar" />
          <p>Calendar</p>
        </div>
      </NavLink>
      {/* <NavLink className={styles.link} to="/">
        <div className={styles["icon"]}>
          <img className={styles.gift} src={Gift} alt="" />
          <p>Gifts</p>
        </div>
      </NavLink> */}
      <NavLink className={styles["link"]} to="/profile">
        <div className={styles["icon"]}>
          <img src={Profile} alt="clay head" />
          <p>Profile</p>
        </div>
      </NavLink>
    </footer>
  );
};

export default Footer;
