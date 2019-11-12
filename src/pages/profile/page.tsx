import React from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';

import {
  CenterContent,
  Link,
  ModalWindow,
  ZeroButton,
  Icon,
  ButtonPrimary,
  Card
} from 'ui';
import { Col, Row } from 'lib/styled-components';
import { $session, sessionRemove } from 'features/common';
import { LinksTable, LinkManagement } from 'features/profile';
import { removeLinks, firstLoadCountAndLinks } from './model/links';
import {
  $idManagementLinks,
  openLinkManagement,
  closeLinkManagement
} from './model/link-management';
import { history } from 'lib/routing';
import { routesPath } from 'pages';

export const ProfilePage: React.FunctionComponent = () => {
  const idManagementLinks = useStore($idManagementLinks);

  return (
    <CenterContent>
      <Col flexwrap="wrap" justify="center" align="center" gap="1rem">
        <UserProfileCard />
        <UserLinksCard />
        <Navigation />
      </Col>

      {idManagementLinks !== null && (
        <ModalWindow closing={() => closeLinkManagement()}>
          <LinkManagement />
        </ModalWindow>
      )}
    </CenterContent>
  );
};

const Navigation = () => {
  const { admin } = useStore($session);

  return (
    <Row justify="space-between" width="100%">
      <Link to={routesPath.home}>Return back</Link>
      {admin ? <Link to={routesPath.admin}>Admin panel</Link> : null}
    </Row>
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
    <Card heading={<Heading />}>
      <div>Your email: {email}</div>
      <ButtonPrimary onClick={() => signOut()} type="submit">
        Sign out
      </ButtonPrimary>
    </Card>
  );
};

const UserLinksCard = () => {
  const ReSyncLinks = () => {
    removeLinks();
    firstLoadCountAndLinks();
  };

  const Heading = () => (
    <Row justify="space-between" align="center">
      <h2>Your links</h2>
      <ButtonDownloadCloud
        onClick={ReSyncLinks}
        aria-label="Re-sync all your links"
      >
        <Icon name="download-cloud" width="1.2rem" height="1.2rem" />
      </ButtonDownloadCloud>
    </Row>
  );

  return (
    <Card heading={<Heading />}>
      <LinksTable openLinkManagement={openLinkManagement} />
    </Card>
  );
};

const ButtonDownloadCloud = styled(ZeroButton)`
  padding-right: 0;
`;
