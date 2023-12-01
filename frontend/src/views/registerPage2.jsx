import { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import styles from "../styles/Page.module.css";
import Logo from "../components/Logo";
import Dropdown from "../components/CitySelect";
import ErrorMessage from "../components/ErrorMessage";
import { useForm, FormProvider } from "react-hook-form";
import BackButton from "../components/BackButton.jsx";

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
  const { registrationData1, registrationData2, setRegistrationData2, isPageOneComplete } = useContext(RegistrationContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isPageOneComplete) {
      navigate("/register/1");
    }

    if (registrationData2) {
      // fill up input fields with data from context
      methods.setValue("contactNumber", registrationData2.contactNumber);
      methods.setValue("streetAddress", registrationData2.streetAddress);
      methods.setValue("city", registrationData2.city);
      methods.setValue("zip", registrationData2.zip);
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
    // Send data to backend
    const requestData = {
      ...registrationData1,
      ...data,
      registrationStep: 2,
    };
    console.log(requestData);
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
      setErrorMessage(data.message) // The message to be displayed to the user
    }).catch(() => {
      setErrorMessage("Unable to connect to the server. Please ensure you're connected to the internet and try again.") // If the server is down
    });
  };

  const onSignInTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    // Add the data from the input fields to the registration context
    const data = methods.getValues();
    setRegistrationData2(data);

    navigate("/register/1");
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
      <main className={styles.pageContent} id="Page Content">
        <BackButton title="Back" onClick={onBackClick} />
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
