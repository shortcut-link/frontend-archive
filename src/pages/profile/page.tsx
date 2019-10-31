import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import {
  CenterContent,
  Link,
  ModalWindow,
  ZeroButton,
  Icon,
  ButtonPrimary
} from 'ui';
import { Col, Row } from 'lib/styled-components';
import { $session, sessionRemove } from 'features/common';
import { CardProfile, LinksTable, LinkManagement } from 'features/profile';
import { removeLinks, firstLoadCountAndLinks } from './model/links';
import {
  $linkManagement,
  openLinkManagement,
  closeLinkManagement
} from './model/link-management';
import { history } from 'lib/routing';

export const ProfilePage: React.FunctionComponent = () => {
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
        <ModalWindow closing={() => closeLinkManagement()}>
          <LinkManagement />
        </ModalWindow>
      )}
    </CenterContent>
  );
};

const UserProfileCard = () => {
  const { email } = useStore($session);

  const Heading = () => <h2>Account</h2>;

  const signOut = () => {
    const confirm = window.confirm('Are you sure you want to sign out?');

    if (confirm) {
      sessionRemove();
      history.push('/');
    }
  };

  return (
    <CardProfile heading={<Heading />}>
      <div>Your email: {email}</div>
      <ButtonPrimary onClick={() => signOut()}>Sign out</ButtonPrimary>
    </CardProfile>
  );
};

const UserLinksCard = () => {
  const ReSyncLinks = () => {
    removeLinks();
    firstLoadCountAndLinks();
  };

  const Heading = () => (
    <header>
      <Row justify="space-between" align="center">
        <h2>Your links</h2>
        <ButtonDownloadCloud
          onClick={ReSyncLinks}
          aria-label="Re-sync all your links"
          tabIndex={1}
        >
          <Icon name="download-cloud" width={20} height={20} />
        </ButtonDownloadCloud>
      </Row>
    </header>
  );

  return (
    <CardProfile heading={<Heading />}>
      <LinksTable openLinkManagement={openLinkManagement} />
    </CardProfile>
  );
};

const ButtonDownloadCloud = styled(ZeroButton)`
  padding-right: 0;
`;
