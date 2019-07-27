import { useEffect } from 'react';
import { useStore } from 'effector-react';

import { $token } from '../model/token';
import { $session } from '../model/session.store';
import { sessionFetch } from '../model/session.events';

export const AccountLoader = ({ children }) => {
  const session = useStore($session);
  const token = useStore($token);

  useEffect(() => {
    sessionFetch();
  }, []);

  if (token && !session) {
    return null;
  } else {
    return children;
  }
};
