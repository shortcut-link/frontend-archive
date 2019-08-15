import './model/index';
import React from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Container,
  Card,
  Input,
  ButtonLoader,
  ErrorBox
} from 'ui';
import {
  $email,
  $password,
  $emailError,
  $passwordError,
  $passwordConfirmation,
  $passwordConfirmationError,
  $isSubmitEnabled,
  $isFormDisabled
} from './model/store';
import { Col } from 'lib/styled-components';
import {
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  registrationFetching,
  formSubmitted
} from './model/events';
import { NavigationRegistrationPage } from 'ui/molecules/bottom-navigation';

export const RegistrationPage = () => {
  return (
    <CenterContent>
      <Container justify="center" align="center">
        <Col width="25rem">
          <Card>
            <LoginForm />
          </Card>
          <NavigationRegistrationPage />
        </Col>
      </Container>
    </CenterContent>
  );
};

const handleSubmit = event => {
  event.preventDefault();
  formSubmitted();
};

const LoginForm = () => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormDisabled = useStore($isFormDisabled);
  const formError = useStore(registrationFetching.error);

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="0.4rem">
        <h2>Registration in Shortcut-Link</h2>
        {formError && <ErrorBox>{formError}</ErrorBox>}
        <Email />
        <Password />
        <PasswordConfirmation />
        <ButtonLoader
          type="submit"
          disabled={!isSubmitEnabled}
          loader={isFormDisabled}
          text="Continue"
        />
      </Col>
    </form>
  );
};

const Email = () => {
  const email = useStore($email);
  const emailError = useStore($emailError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="email"
      name="email"
      autoComplete="email"
      label="Email"
      errorLabel={true}
      error={email && emailError}
      value={email}
      onChange={emailChange}
      disabled={isFormDisabled}
    />
  );
};

const Password = () => {
  const password = useStore($password);
  const passwordError = useStore($passwordError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="password"
      name="password"
      autoComplete="password"
      label="Password"
      errorLabel={true}
      error={password && passwordError}
      value={password}
      onChange={passwordChange}
      disabled={isFormDisabled}
    />
  );
};
const PasswordConfirmation = () => {
  const passwordConfirmation = useStore($passwordConfirmation);
  const passwordConfirmationError = useStore($passwordConfirmationError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="password"
      name="password"
      autoComplete="password"
      label="Password confirmation"
      errorLabel={true}
      error={passwordConfirmation && passwordConfirmationError}
      value={passwordConfirmation}
      onChange={passwordConfirmationChange}
      disabled={isFormDisabled}
    />
  );
};
