import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Container,
  Card,
  Input,
  ButtonLoader,
  ErrorBox,
  Link
} from 'ui';
import {
  $emailField,
  $passwordField,
  $emailError,
  $passwordError,
  $passwordConfirmationField,
  $passwordConfirmationError,
  $isSubmitEnabled,
  $isFormDisabled,
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  registrationFetching,
  formSubmitted,
  captchaPassed
} from './model';
import { Col, Row } from 'lib/styled-components';
import { Captcha } from 'lib/captcha';
import { routesPath } from 'pages';

export const RegistrationPage: React.FunctionComponent = () => {
  useEffect(() => {
    document.title = 'Registration';
  }, []);

  return (
    <CenterContent>
      <Container justify="center" align="center">
        <Col width="370px" gap="1rem">
          <Card>
            <LoginForm />
          </Card>
          <Navigation />
        </Col>
      </Container>
    </CenterContent>
  );
};

const Navigation = () => (
  <Row justify="center">
    <Link to={routesPath.join.login}>Return back</Link>
  </Row>
);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  formSubmitted();
};

const LoginForm = () => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormDisabled = useStore($isFormDisabled);
  const formError = useStore(registrationFetching.error);

  return (
    <Col onSubmit={handleSubmit} tag="form" gap="1rem">
      <h1 style={{ fontSize: '1.3rem' }}>Registration in Shortcut-Link</h1>
      {formError && <ErrorBox>{formError}</ErrorBox>}
      <Email />
      <Password />
      <PasswordConfirmation />
      <Captcha onChange={captchaPassed} />
      <ButtonLoader
        type="submit"
        disabled={!isSubmitEnabled}
        loader={isFormDisabled}
      >
        Continue
      </ButtonLoader>
    </Col>
  );
};

const Email = () => {
  const emailField = useStore($emailField);
  const emailError = useStore($emailError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="email"
      name="email"
      autoComplete="on"
      label="Email"
      error={emailField && emailError}
      value={emailField}
      onChange={emailChange}
      disabled={isFormDisabled}
    />
  );
};

const Password = () => {
  const passwordField = useStore($passwordField);
  const passwordError = useStore($passwordError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="password"
      name="password"
      autoComplete="on"
      label="Password"
      error={passwordField && passwordError}
      value={passwordField}
      onChange={passwordChange}
      disabled={isFormDisabled}
    />
  );
};
const PasswordConfirmation = () => {
  const passwordConfirmationField = useStore($passwordConfirmationField);
  const passwordConfirmationError = useStore($passwordConfirmationError);
  const isFormDisabled = useStore($isFormDisabled);

  return (
    <Input
      type="password"
      name="password"
      autoComplete="on"
      label="Password confirmation"
      error={passwordConfirmationField && passwordConfirmationError}
      value={passwordConfirmationField}
      onChange={passwordConfirmationChange}
      disabled={isFormDisabled}
    />
  );
};
