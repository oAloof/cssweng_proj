import { useCallback, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/Page.module.css";
import ErrorMessage from "../components/ErrorMessage";
import Logo from "../components/Logo";
import Check from "../components/Check";

import { useForm, FormProvider } from "react-hook-form";
import {
  username_validation,
  email_validation,
  password_validation,
  confirmPassword_validation,
  firstname_validation,
  lastname_validation,
} from "../utils/inputValidations";

// CONTEXTS
import { RegistrationContext } from "../contexts/RegistrationContext";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const RegisterPage1 = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [validateLength, setValidateLength] = useState(false);
  const [validateMixedCase, setValidateMixedCase] = useState(false);
  const [validateNumber, setValidateNumber] = useState(false);
  const [validatePasswordMatch, setValidatePasswordMatch] = useState(false);

  const {
      registrationData1,
      isPageOneComplete,
      setRegistrationData1,
      setIsPageOneComplete,
    } = useContext(RegistrationContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated, isAdmin, isLoadingAuth } = useContext(AuthenticationContext);

  useEffect(() => {
    // Update password validations
    const isLengthValid = password.length >= 8 && password.length <= 36;
    const isMixedCaseValid = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const isNumberValid = /[0-9]/.test(password);
    setValidateLength(isLengthValid);
    setValidateMixedCase(isMixedCaseValid);
    setValidateNumber(isNumberValid);
    const bothFieldsFilled =
      password.length > 0 && confirmedPassword.length > 0;
    setValidatePasswordMatch(
      bothFieldsFilled && password === confirmedPassword
    );
  }, [password, confirmedPassword]);

 

  useEffect(() => {
    if (isPageOneComplete) {
      // fill up input fields with data from context
      methods.setValue("username", registrationData1.username);
      methods.setValue("firstName", registrationData1.firstName);
      methods.setValue("lastName", registrationData1.lastName);
      methods.setValue("email", registrationData1.email);
      methods.setValue("password", registrationData1.password);
      methods.setValue("confirmPassword", registrationData1.confirmPassword);
    }

    // Set a timer to clear the error message after 5 seconds
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isPageOneComplete, errorMessage]);

  const onSubmit = (data) => {
    setRegistrationData1(data);
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
    })
      .then((response) => {
        if (response.status === 200) {
          setIsPageOneComplete(true);
          navigate("/register/2");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setErrorMessage(data.message); // The message to be displayed to the user
      })
      .catch(() => {
        setErrorMessage(
          "Unable to connect to the server. Please ensure you're connected to the internet and try again."
        ); // If the server is down
      });
  };

  const onSignInTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Update state for each validation check
    setValidateLength(newPassword.length >= 8 && newPassword.length <= 36);
    setValidateMixedCase(
      /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)
    );
    setValidateNumber(/[0-9]/.test(newPassword));
  };

  const handleConfirmedPasswordChange = (e) => {
    const newConfirmedPassword = e.target.value;
    setConfirmedPassword(newConfirmedPassword);

    // Perform confirmed password validation check
    setValidatePasswordMatch(password && password === newConfirmedPassword);
  };

  if (isAuthenticated && !isAdmin) {
    navigate("/");
  }
  if (isAuthenticated && isAdmin) {
    navigate("/admin/home");
  }
  if (isLoadingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

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
            <InputField
              {...password_validation}
              value={password}
              onChange={handlePasswordChange}
            />
            <InputField
              {...confirmPassword_validation}
              value={confirmedPassword}
              onChange={handleConfirmedPasswordChange}
            />
            {/* Password Validation */}
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
            </div>{" "}
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
