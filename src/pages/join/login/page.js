import './model/index';
import React from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Container,
  Card,
  Input,
  ButtonLoader,
  Link,
  ErrorBox
} from 'ui';
import { Col, Row } from 'lib/styled-components';
import {
  emailChange,
  passwordChange,
  formSubmitted,
  loginFetching
} from './model/events';
import {
  $isSubmitEnabled,
  $isFormDisabled,
  $email,
  $password,
  $passwordError,
  $emailError
} from './model/store';

export const LoginPage = () => {
  return (
    <CenterContent>
      <Container justify="center" align="center">
        <Col width="25rem">
          <Card>
            <LoginForm />
          </Card>
          <NavigationBar />
        </Col>
      </Container>
    </CenterContent>
  );
};

const NavigationBar = () => (
  <Row justify="center" padding="1rem 0.5rem">
    <Link to="/">Return back</Link>
  </Row>
);

const handleSubmit = event => {
  event.preventDefault();
  formSubmitted();
};

const LoginForm = () => {
  const isSubmitEnabled = useStore($isSubmitEnabled);
  const isFormDisabled = useStore($isFormDisabled);
  const formError = useStore(loginFetching.error);

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="0.4rem">
        <h2>Shortcut-Link</h2>
        {formError && <ErrorBox>{mapServerToClientError(formError)}</ErrorBox>}
        <Email />
        <Password />
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

const mapServerToClientError = error => {
  switch (error) {
    case 'user_not_found':
      return 'Email not found or password is wrong';
    case 'cant_create_session': // pass thru
    default:
      return 'Got an unexpected error. Try again later';
  }
};
