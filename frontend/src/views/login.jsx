import { useCallback, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  });

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  });

  const onLogInClick = useCallback(() => {
    // Use backend to determine if email and password are valid
    fetch ("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [email, password]);

  const onRegisterClick = useCallback(() => {
    navigate("/register/1");
  }, [navigate]);

  const onForgotPasswordClick = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  return (
    <div className={styles.loginPage}>
      <img
        className={styles.logoDefault}
        alt="BX Appliance Logo"
        src="/logos/bx-appliances-logo1@2x.png"
      />
      <section className={styles.mainContent} id="Page Content">
        <header className={styles.header}>
          <h1 className={styles.heading}>Log In</h1>
          <h3 className={styles.subheading}>Welcome back!</h3>
        </header>
        <div className={styles.inputFields}>
          <InputField 
            placeholder="Email" 
            id="emailField" 
            category="email"
            onChange={onEmailChange}
            value={email}
            />
          <InputField
            placeholder="Password"
            id="passwordField"
            category="password"
            onChange={onPasswordChange}
            value={password}
          />
          <Button
            buttonText="Log In"
            logInTextAlign="center"
            logInFlex="1"
            buttonClass="blue"
            onBtnClick={onLogInClick}
            type="submit"
          />
        </div>
        <div className={styles.prompts}>
          <div className={styles.accountExists}>
            <h6 className={styles.dontHaveAn}>Don’t have an account yet?</h6>
            <h6 className={styles.register} onClick={onRegisterClick}>
              Register
            </h6>
          </div>
          <h6 className={styles.forgotPassword} onClick={onForgotPasswordClick}>
            Forgot password?
          </h6>
        </div>
      </section>
    </div>
  );
};

export default Login;
