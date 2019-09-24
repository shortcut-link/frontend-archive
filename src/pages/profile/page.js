import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import { CenterContent, Link, ModalWindow, ZeroButton, Icon } from 'ui';
import { Col, Row } from 'lib/styled-components';
import { $session } from 'features/common';
import { CardProfile, LinksTable, LinkManagement } from 'features/profile';
import { $linkManagement } from './model';
import {
  openlinkManagement,
  closelinkManagement,
  removeLinks,
  getLinks
} from './model';

export const ProfilePage = () => {
  const linkManagement = useStore($linkManagement);

  return (
    <CenterContent>
      <Col flexWrap="wrap" justify="center" align="center" gap="1rem">
        <UserProfileCard />
        <UserLinksCard />
        <Link to={'/'} tabIndex={3}>
          Return back
        </Link>
      </Col>

      {linkManagement !== null && (
        <ModalWindow closing={closelinkManagement}>
          <LinkManagement />
        </ModalWindow>
      )}
    </CenterContent>
  );
};

const UserProfileCard = () => {
  const { email } = useStore($session);

  const Heading = () => <h2>Account</h2>;

  return (
    <CardProfile heading={<Heading />}>
      <div>Your email: {email}</div>
    </CardProfile>
  );
};

const UserLinksCard = () => {
  const Heading = () => (
    <header>
      <Row justify="space-between" align="center">
        <h2>Your links</h2>
        <ButtonDownloadCloud
          onClick={Download}
          aria-label="Re-sync all your links"
          tabIndex={1}
        >
          <Icon name="download-cloud" width={20} height={20} />
        </ButtonDownloadCloud>
      </Row>
    </header>
  );

  const Download = () => {
    removeLinks();
    getLinks({ startIndex: 0, count: true });
  };

  return (
    <CardProfile heading={<Heading />}>
      <LinksTable openlinkManagement={openlinkManagement} />
    </CardProfile>
  );
};

const ButtonDownloadCloud = styled(ZeroButton)`
  padding-right: 0;
`;
