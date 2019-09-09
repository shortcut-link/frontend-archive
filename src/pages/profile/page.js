import React from 'react';
import { useStore } from 'effector-react';

import { CenterContent, Link } from 'ui';
import { Col } from 'lib/styled-components';
import { $session } from 'features/common';
import { CardProfile } from 'features/profile';

export const ProfilePage = () => {
  return (
    <CenterContent>
      <Col justify="center" align="center">
        <Col flexWrap="wrap" justify="center" align="center" gap="1rem">
          <UserProfileCard />
          <Link to={'/'}>Return back</Link>
        </Col>
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
