import React from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";
import useLoginForm from "../../hooks/useLoginForm";

const Login = () => {
  const [
    isLoading,
    errorMessage,
    redirect,
    handleCredentialsChange,
    handleSubmit,
  ] = useLoginForm();

  if (redirect) return <Redirect to="/" />;

  return (
    <LoginForm
      isLoading={isLoading}
      errorMessage={errorMessage}
      handleCredentialsChange={handleCredentialsChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
