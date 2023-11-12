import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/registerPage1.module.css";

const RegisterPage1 = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const onEmailAddressChange = (e) => {
    setEmailAddress(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  }

  const onNextClick = useCallback(() => {
    navigate("");
  }, [navigate]);

  const onSignInTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.registerPage1}>
      <img
        className={styles.bxAppliancesLogo}
        type="Original"
        alt=""
        src="/logos/bx-appliances-logo@2x.png"
      />
      <main className={styles.mainContent} id="main">
        <header className={styles.header}>
          <h1 className={styles.register} id="Header">
            Register
          </h1>
          <h3 className={styles.createAnAccount} id="Subheading 1">
            Create an account
          </h3>
        </header>
        <div className={styles.registrationFields}>
          <InputField 
          placeholder="First Name" 
          id="firstNameField"
          category="text"
          onChange={onFirstNameChange}
          value={firstName}
          />
          <InputField 
          placeholder="Last Name" 
          id="lastNameField"
          category="text"
          onChange={onLastNameChange}
          value={lastName}
          />
          <InputField 
          placeholder="Email Address" 
          id="emailField"
          category="email"
          onChange={onEmailAddressChange}
          value={emailAddress}
          />
          <InputField 
          placeholder="Password" 
          id="passwordField" 
          category="password"
          onChange={onPasswordChange}
          value={password}
          />
          <InputField 
          placeholder="Confirm Password" 
          id="confPassField" 
          category="password"
          onChange={onConfPasswordChange}
          value={confPassword}
          />
          <div className={styles.passwordValidation}>
            <div className={styles.yourPasswordMust}>Your password must:</div>
            <div className={styles.validationChecks}>
              <div className={styles.validationField}>
                <img className={styles.checkIcon} alt="" src="/check.svg" />
                <div className={styles.containAtLeast}>
                  Contain at least 8-36 characters
                </div>
              </div>
              <div className={styles.validationField1}>
                <img className={styles.checkIcon} alt="" src="/check1.svg" />
                <div className={styles.containAtLeast}>
                  Contain at least 1 mixed case letter
                </div>
              </div>
              <div className={styles.validationField2}>
                <img className={styles.checkIcon} alt="" src="/check1.svg" />
                <div className={styles.containAtLeast}>
                  Contain at least 1 number
                </div>
              </div>
            </div>
          </div>
          <Button
            buttonText="Next"
            logInTextAlign="center"
            logInFlex="1"
            buttonClass="blue"
            onBtnClick={onNextClick}
            type="submit"
          />
          <div className={styles.promptContainer}>
            <div className={styles.alreadyHaveAn}>Already have an account?</div>
            <b className={styles.signIn} onClick={onSignInTextClick}>
              Sign in
            </b>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage1;