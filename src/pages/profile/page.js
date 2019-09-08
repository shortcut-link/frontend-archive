import React from 'react';
import { useStore } from 'effector-react';

import { CenterContent, Container, Link } from 'ui';
import { Row, Col } from 'lib/styled-components';
import { $session } from 'features/common';
import { CardProfile } from 'features/profile';

export const ProfilePage = () => {
  return (
    <CenterContent>
      <Col justify="center" align="center">
        <Container>
          <Row flexWrap="wrap">
            <UserProfileCard />
          </Row>
        </Container>
        <Link to={'/'}>Return back</Link>
      </Col>
    </CenterContent>
  );
};

const UserProfileCard = () => {
  const { email } = useStore($session);
  return (
    <CardProfile heading="Account">
      <span>Your email: {email}</span>
    </CardProfile>
  );
};
