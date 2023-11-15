import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/Page.module.css";
import Logo from "../components/Logo";
import Dropdown from "../components/CitySelect";
import { useForm, FormProvider } from "react-hook-form";
import BackButton from "../components/BackButton.jsx";

import {
  contactNumber_validation,
  zip_validation,
  streetAddress_validation,
  city_validation,
} from "../utils/inputValidations";

const RegisterPage2 = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/register");
    //methods.reset();
  };

  const onSignInTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Logo name="default"></Logo>
      <main className={styles.pageContent} id="Page Content">
        <BackButton title="Back" />
        <header className={styles.header}>
          <h1>Register</h1>
          <h3>Shipping Address</h3>
        </header>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className={styles.inputFields}
          >
            <InputField {...contactNumber_validation} />
            <InputField {...streetAddress_validation} />
            <Dropdown
              control={methods.control}
              name="city"
              {...city_validation}
            />
            <InputField {...zip_validation} />
            <Button
              buttonText="Register"
              logInTextAlign="center"
              logInFlex="1"
              buttonClass="red"
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

export default RegisterPage2;
