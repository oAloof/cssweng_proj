import { useCallback, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginRegister.module.css";
import Logo from "../components/DefaultLogo";
import { useForm, FormProvider } from "react-hook-form";
import {
  email_validation,
  password_validation,
} from "../utils/inputValidations";

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    // Send data to backend
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        navigate("/");
      } else {
        return response.json();
      }
    }).then((data) => {
      console.log(data.message); // The message to be displayed to the user
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
      <Logo></Logo>
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
            <InputField {...email_validation} />
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
