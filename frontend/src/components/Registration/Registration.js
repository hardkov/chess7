import React from "react";
import { Redirect } from "react-router-dom";
import useRegistrationForm from "../../hooks/useRegistrationForm";

import RegistrationForm from "./RegistrationForm";

const Registration = () => {
  const [
    isLoading,
    errorMessage,
    redirect,
    handleCredentialsChange,
    handleSubmit,
  ] = useRegistrationForm();

  if (redirect) return <Redirect to="/" />;

  return (
    <RegistrationForm
      isLoading={isLoading}
      errorMessage={errorMessage}
      handleCredentialsChange={handleCredentialsChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Registration;
