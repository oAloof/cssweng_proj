import { useCallback, useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Page.module.css";
import Logo from "../components/Logo";
import { useForm, FormProvider } from "react-hook-form";
import {
  username_validation,
  password_validation,
} from "../utils/inputValidations";


const Login = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/"); 
    }

    // Set a timer to clear the error message after 5 seconds
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage]);
  
  const onSubmit = (data) => {
    // Send data to backend
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", true);
        navigate("/"); 
        return response.json();
      } else {
        return response.json();
      }
    }).then((data) => {
      setErrorMessage(data.message) // The message to be displayed to the user
    }).catch(() => {
      setErrorMessage("Unable to connect to the server. Please ensure you're connected to the internet and try again.") // If the server is down
    });
  };

  const onRegisterClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onForgotPasswordClick = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  return (
    <div className={styles.page}>
      {errorMessage && 
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      }
      <Logo name="default"></Logo>
      <section className={styles.pageContent} id="Page Content">
        <header className={styles.header}>
          <h1>Log In</h1>
          <h3>Welcome back!</h3>
        </header>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className={styles.inputFields}
          >
            <InputField {...username_validation} />
            <InputField {...password_validation} />
            <Button
              buttonText="Log In"
              logInTextAlign="center"
              logInFlex="1"
              buttonClass="blue"
              type="submit"
            />
          </form>
        </FormProvider>
        <div className={styles.prompts}>
          <div className={styles.registerTextContainer}>
            <h6>Don’t have an account yet?</h6>
            <h6 className={styles.blueh6} onClick={onRegisterClick}>
              Register
            </h6>
          </div>
          <h6 className={styles.grayh6} onClick={onForgotPasswordClick}>
            Forgot password?
          </h6>
        </div>
      </section>
    </div>
  );
};

export default Login;
