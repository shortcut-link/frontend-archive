import './model';
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
  $email,
  $password,
  $emailError,
  $passwordError,
  $passwordConfirmation,
  $passwordConfirmationError,
  $isSubmitEnabled,
  $isFormDisabled
} from './model/store';
import { Col, Row } from 'lib/styled-components';
import {
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  registrationFetching,
  formSubmitted,
  captchaPassed
} from './model/events';
import { Captcha } from 'lib/captcha';
import { routesPath } from 'pages';

export const RegistrationPage = () => {
  useEffect(() => {
    document.title = 'Registration';
  }, []);

  return (
    <CenterContent>
      <Container justify="center" align="center">
        <Col width="370px">
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
  <Row justify="center" padding="1rem 0.5rem">
    <Link to={routesPath.join.login}>Return back</Link>
  </Row>
);

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
      <Col gap="1rem">
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
      error={passwordConfirmation && passwordConfirmationError}
      value={passwordConfirmation}
      onChange={passwordConfirmationChange}
      disabled={isFormDisabled}
    />
  );
};
