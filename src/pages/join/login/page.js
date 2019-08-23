import './model';
import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import {
  CenterContent,
  Container,
  Card,
  Input,
  ButtonLoader,
  ErrorBox
} from 'ui';
import { Col } from 'lib/styled-components';
import {
  emailChange,
  passwordChange,
  formSubmitted,
  loginFetching,
  captchaPassed
} from './model/events';
import {
  $isSubmitEnabled,
  $isFormDisabled,
  $email,
  $password,
  $passwordError,
  $emailError
} from './model/store';
import { NavigationLoginPage } from 'ui/molecules';
import { Captcha } from 'lib/captcha';

export const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <CenterContent>
      <Container justify="center" align="center">
        <Col width="25rem">
          <Card>
            <LoginForm />
          </Card>
          <NavigationLoginPage />
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
  const formError = useStore(loginFetching.error);

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="1rem">
        <h2>Shortcut-Link</h2>
        {formError && <ErrorBox>{formError}</ErrorBox>}
        <Email />
        <Password />
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
