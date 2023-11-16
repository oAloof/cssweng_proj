import { useCallback } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
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

  const onSubmit = (data) => {
    console.log(data);
    //methods.reset();
  };

  const onRegisterClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onForgotPasswordClick = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  return (
    <div className={styles.page}>
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
