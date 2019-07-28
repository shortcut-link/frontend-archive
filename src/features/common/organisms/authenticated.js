//@flow
import { useStore } from 'effector-react';

import { $session, type Session as SessionType } from '../model/session.store';

type Props = {
  renderExists: (session: SessionType) => void,
  renderEmpty: () => void
};

export const Authenticated = ({ renderExists, renderEmpty }: Props) => {
  const session = useStore($session);
  if (session && renderExists) {
    return renderExists(session);
  } else {
    return renderEmpty();
  }
};
