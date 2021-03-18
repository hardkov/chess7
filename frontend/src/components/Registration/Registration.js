import React from "react";
import { Redirect } from "react-router-dom";

import { registerUser } from "../../services/authService";
import useForm from "../../hooks/useForm";
import RegistrationForm from "./RegistrationForm";

const Registration = () => {
  const [
    isLoading,
    errorMessage,
    redirect,
    handleCredentialsChange,
    handleSubmit,
  ] = useForm(registerUser, { username: "", password: "" });

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
