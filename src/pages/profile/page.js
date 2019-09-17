import './model';
import React, { useState } from 'react';
import { useStore } from 'effector-react';

import { CenterContent, Link, ModalWindow } from 'ui';
import { Col } from 'lib/styled-components';
import { $session } from 'features/common';
import { CardProfile, LinksTable, LinkManagement } from 'features/profile';

export const ProfilePage = () => {
  const [linkManagement, setLinkManagement] = useState(undefined);

  return (
    <CenterContent>
      <Col justify="center" align="center">
        <Col flexWrap="wrap" justify="center" align="center" gap="1rem">
          <UserProfileCard />
          <UserLinksCard setLinkManagement={setLinkManagement} />
          <Link to={'/'}>Return back</Link>
        </Col>
      </Col>

      {linkManagement !== undefined && (
        <ModalWindow toClose={setLinkManagement}>
          <LinkManagement linkIndex={linkManagement} />
        </ModalWindow>
      )}
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

const UserLinksCard = ({ setLinkManagement }) => (
  <CardProfile heading="Your links">
    <LinksTable setLinkManagement={setLinkManagement} />
  </CardProfile>
);
