import React from "react";
import styles from "../styles/Logo.module.css";

const logos = {
  default: {
    src: "/logos/BXAppliancesLogo.png",
    style: styles.default,
    link: "/",
  },

  topbar: {
    src: "/logos/BlueLogo.png",
    style: styles.topbar,
    link: "/",
  },

  white: {
    src: "/logos/White Logo.png",
    style: styles.topbar,
    link: "/",
  },

  admin: {
    src: "/logos/BlueLogo.png",
    style: styles.default,
    link: "/admin/home",
  },
};

const Logo = ({ name, ...props }) => {
  const logo = logos[name];
  if (!logo) {
    console.error(`Logo not found: ${name}`);
    return null;
  }

  return (
    <a href={logo.link}>
      <img
        src={logo.src}
        alt={`${name} logo`}
        className={logo.style}
        style={{ objectFit: "contain" }}
        {...props}
      />
    </a>
  );
};

export default Logo;
