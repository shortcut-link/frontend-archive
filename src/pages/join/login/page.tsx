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
import { Col, Row } from 'lib/styled-components';
import {
  $email,
  $password,
  $passwordError,
  $emailError,
  $isSubmitEnabled,
  $isFormDisabled,
  emailChange,
  passwordChange,
  formSubmitted,
  loginFetching,
  captchaPassed
} from './model';
import { Captcha } from 'lib/captcha';
import { routesPath } from 'pages';

export const LoginPage: React.FunctionComponent = () => {
  useEffect(() => {
    document.title = 'Login';
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
  <Row justify="space-between" padding="1rem 0.5rem">
    <Link to={routesPath.home}>Return back</Link>
    <Link to={routesPath.join.registration}>Account registration</Link>
  </Row>
);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        <h1 style={{ fontSize: '1.3rem' }}>Shortcut-Link</h1>
        {formError && <ErrorBox>{formError}</ErrorBox>}
        <Email />
        <Password />
        <Captcha onChange={captchaPassed} />
        <ButtonLoader
          type="submit"
          disabled={!isSubmitEnabled}
          loader={isFormDisabled}
        >
          Continue
        </ButtonLoader>
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
      autoComplete="on"
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
      autoComplete="on"
      label="Password"
      error={password && passwordError}
      value={password}
      onChange={passwordChange}
      disabled={isFormDisabled}
    />
  );
};
