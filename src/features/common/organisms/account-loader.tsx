import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import { $token } from '../model/token';
import { $session } from '../model/session';
import { sessionFetchProcessing } from '../model/session';

export const AccountLoader: React.FC | null = ({ children }) => {
  const session = useStore($session);
  const token = useStore($token);

  useEffect(() => {
    $token.getState() && sessionFetchProcessing();
  }, []);

  if (token && !session) {
    return null;
  } else {
    return <>{children}</>;
  }
};
