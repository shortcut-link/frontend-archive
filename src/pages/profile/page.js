import './model';
import React from 'react';
import { useStore } from 'effector-react';

import { CenterContent, Link, ModalWindow } from 'ui';
import { Col } from 'lib/styled-components';
import { $session } from 'features/common';
import { CardProfile, LinksTable, LinkManagement } from 'features/profile';
import { $linkManagement } from './model/store';
import { openlinkManagement, closelinkManagement } from './model/events';

export const ProfilePage = () => {
  const linkManagement = useStore($linkManagement);

  return (
    <CenterContent>
      <Col justify="center" align="center">
        <Col flexWrap="wrap" justify="center" align="center" gap="1rem">
          <UserProfileCard />
          <UserLinksCard />
          <Link to={'/'}>Return back</Link>
        </Col>
      </Col>

      {linkManagement !== null && (
        <ModalWindow toClose={closelinkManagement}>
          <LinkManagement />
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

const UserLinksCard = () => (
  <CardProfile heading="Your links">
    <LinksTable openlinkManagement={openlinkManagement} />
  </CardProfile>
);
