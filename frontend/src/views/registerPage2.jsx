import { useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/Page.module.css";
import Logo from "../components/Logo";
import Dropdown from "../components/CitySelect";
import { useForm, FormProvider } from "react-hook-form";

import {
  contactNumber_validation,
  zip_validation,
  streetAddress_validation,
  city_validation,
} from "../utils/inputValidations";
import { RegistrationContext } from "../contexts/RegistrationContext";

const RegisterPage2 = () => {
  const navigate = useNavigate();
  const methods = useForm({ mode: "onSubmit" });
  const { registrationData, isPageOneComplete } = useContext(RegistrationContext);

  useEffect(() => {
    if (!isPageOneComplete) {
      navigate("/register/1");
    }
  }, [isPageOneComplete]);

  const onSubmit = (data) => {
    // Send data to backend
    const requestData = {
      ...registrationData,
      ...data,
      registrationStep: 2,
    };
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        return response.json();
      }
    }).then((data) => {
      console.log(data.message); // The message to be displayed to the user
    });
  };

  const onSignInTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  // ADD BACK BUTTON

  return (
    <div className={styles.page}>
      <Logo name="default"></Logo>
      <main className={styles.pageContent} id="Page Content">
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
