import React from "react";
import styles from "../styles/Logo.module.css";

const logos = {
  default: {
    src: "/logos/BXAppliancesLogo.png",
    style: styles.default,
  },

  topbar: {
    src: "/logos/BlueLogo.png",
    style: styles.topbar,
  },

  white: {
    src: "/logos/White Logo.png",
    style: styles.topbar,
  },
};

const Logo = ({ name, ...props }) => {
  const logo = logos[name];
  if (!logo) {
    console.error(`Logo not found: ${name}`);
    return null;
  }

  return (
    <img
      src={logo.src}
      alt={`${name} logo`}
      className={logo.style}
      {...props}
    />
  );
};

export default Logo;
