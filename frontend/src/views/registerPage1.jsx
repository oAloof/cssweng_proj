import { useCallback, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/Page.module.css";
import ErrorMessage from "../components/ErrorMessage";
import Logo from "../components/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useForm, FormProvider } from "react-hook-form";
import {
  username_validation,
  email_validation,
  password_validation,
  confirmPassword_validation,
  firstname_validation,
  lastname_validation,
} from "../utils/inputValidations";
import { RegistrationContext } from "../contexts/RegistrationContext";

const RegisterPage1 = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  const { registrationData, isPageOneComplete, setRegistrationData, setIsPageOneComplete } = useContext(RegistrationContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/"); 
    }

    if (isPageOneComplete) {
      // fill up input fields with data from context
      methods.setValue("username", registrationData.username);
      methods.setValue("firstName", registrationData.firstName);
      methods.setValue("lastName", registrationData.lastName);
      methods.setValue("email", registrationData.email);
      methods.setValue("password", registrationData.password);
      methods.setValue("confirmPassword", registrationData.confirmPassword);
    }

    // Set a timer to clear the error message after 5 seconds
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isPageOneComplete, errorMessage]);
  const onSubmit = (data) => {
    setRegistrationData(data);
    // Send data to backend to check if email already exists
    const requestData = {
      ...data,
      registrationStep: 1,
    };

    fetch("http://localhost:4000/api/register", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        setIsPageOneComplete(true);
        navigate("/register/2");
      } else {
        return response.json();
      }
    }).then((data) => {
      setErrorMessage(data.message) // The message to be displayed to the user
    }).catch(() => {
      setErrorMessage("Unable to connect to the server. Please ensure you're connected to the internet and try again.") // If the server is down
    });
  };

  const onSignInTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  /* const password = watch("password");
  const confirmedPassword = watch("confirmedPassword"); */

  // Validation Checks
  /* const validateLength = password.length >= 8 && password.length <= 36;
  const validateMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const validateNumber = /[0-9]/.test(password);
  const validatePasswordMatch =
    password === confirmedPassword && password.length > 0; */

  return (
    <div className={styles.page}>
      {errorMessage && 
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      }

      <Logo name="default"></Logo>
      <main className={styles.pageContent} id="Page Content">
        <header className={styles.header}>
          <h1>Register</h1>
          <h3>Create an account</h3>
        </header>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className={styles.inputFields}
          >
            <InputField {...username_validation} />
            <InputField {...firstname_validation} />
            <InputField {...lastname_validation} />
            <InputField {...email_validation} />
            <InputField {...password_validation} />
            <InputField {...confirmPassword_validation} />

            {/* 
            <div className={styles.passwordValidation}>
              <div className={styles.validationCheckTitle}>
                Your password must:
              </div>
              <div className={styles.validationChecks}>
                <div className={styles.validationField}>
                  <Check isValid={validateLength}></Check>
                  <div className={styles.validationText}>
                    Contain at least 8-36 characters
                  </div>
                </div>
                <div className={styles.validationField}>
                  <Check isValid={validateMixedCase}></Check>
                  <div className={styles.validationText}>
                    Contain at least 1 mixed case letter
                  </div>
                </div>
                <div className={styles.validationField}>
                  <Check isValid={validateNumber}></Check>
                  <div className={styles.validationText}>
                    Contain at least 1 number
                  </div>
                </div>
                <div className={styles.validationField}>
                  <Check isValid={validatePasswordMatch}></Check>
                  <div className={styles.validationText}>Match</div>
                </div>
              </div>
            </div> }
  */}
            <Button
              buttonText="Next"
              logInTextAlign="center"
              logInFlex="1"
              buttonClass="blue"
              type="submit"
            />
            <div className={styles.prompts}>
              <div className={styles.registerTextContainer}>
                <h6>Already have an account?</h6>
                <h6 className={styles.blueh6} onClick={onSignInTextClick}>
                  Sign In
                </h6>
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default RegisterPage1;
