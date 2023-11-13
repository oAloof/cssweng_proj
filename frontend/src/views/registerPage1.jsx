import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/loginRegister.module.css";
import Check from "../components/Check";
import Logo from "../components/DefaultLogo";
import { useForm, FormProvider } from "react-hook-form";
import {
  email_validation,
  password_validation,
  confirmPassword_validation,
  firstname_validation,
  lastname_validation,
} from "../utils/inputValidations";

const RegisterPage1 = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  //const { watch } = methods;

  const onSubmit = (data) => {
    console.log(data);
    navigate("/register-page-2");
    //methods.reset();
  };

  const onSignInTextClick = useCallback(() => {
    navigate("/");
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
      <Logo></Logo>
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
