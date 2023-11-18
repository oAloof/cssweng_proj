import React from "react";
import { useNavigate } from "react-router-dom";

const logos = {
  default: {
    src: "/logos/BXAppliancesLogo.png",
    className: "relative w-[153px] h-[44px] object-cover",
  },

  topbar: {
    src: "/logos/BlueLogo.png",
    className: "relative w-auto h-[38px] object-cover",
  },

  white: {
    src: "/logos/White Logo.png",
    className: "relative w-auto h-[38px] object-cover",
  },

  admin: {
    src: "/logos/BlueLogo.png",
    className: "relative w-auto h-[38px] object-cover",
  },
};

const Logo = ({ name, ...props }) => {
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate("/");
  };

  const logo = logos[name];
  if (!logo) {
    console.error(`Logo not found: ${name}`);
    return null;
  }

  return (
    <img
      src={logo.src}
      alt={`${name} logo`}
      className={logo.className}
      {...props}
      onClick={onLogoClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Logo;
