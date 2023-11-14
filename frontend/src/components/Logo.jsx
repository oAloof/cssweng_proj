import React from "react";
import styles from "../styles/Logo.module.css";

const logos = {
  default: {
    src: "../public/logos/BXAppliancesLogo.png",
    style: styles.default,
  },

  topbar: {
    src: "../public/logos/BlueLogo.png",
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
