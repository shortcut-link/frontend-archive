import { useStore } from 'effector-react';

import { $session } from '../model/session';
import { User } from 'api/account';

interface AuthenticatedProps {
  renderExists: (session: User) => JSX.Element;
  renderEmpty: () => JSX.Element;
}

export const Authenticated = ({
  renderExists,
  renderEmpty
}: AuthenticatedProps): JSX.Element => {
  const session = useStore($session);

  if (session && renderExists) {
    return renderExists(session);
  } else {
    return renderEmpty();
  }
};
