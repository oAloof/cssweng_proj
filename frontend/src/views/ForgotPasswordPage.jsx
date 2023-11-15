import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/Page.module.css";
import Logo from "../components/Logo";
import { email_validation } from "../utils/inputValidations";
import { useForm, FormProvider } from "react-hook-form";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/register-page-2");
    //methods.reset();
  };

  const onLoginTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Logo name="default"></Logo>
      <main className={styles.pageContent} id="Page Content">
        <header className={styles.header}>
          <h1>Forgot Password</h1>
        </header>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className={styles.inputFields}
          >
            <InputField {...email_validation} />
            <Button
              buttonText="Send Password Reset Email"
              buttonClass="blue"
              type="submit"
            />
            <div className={styles.prompts}>
              <div className={styles.registerTextContainer}>
                <h6>Already have an account?</h6>
                <h6 className={styles.blueh6} onClick={onLoginTextClick}>
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

export default ForgotPasswordPage;
