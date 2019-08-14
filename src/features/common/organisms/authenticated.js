import { useStore } from 'effector-react';

import { $session } from '../model/session.store';

export const Authenticated = ({ renderExists, renderEmpty }) => {
  const session = useStore($session);
  if (session && renderExists) {
    return renderExists(session);
  } else {
    return renderEmpty();
  }
};
