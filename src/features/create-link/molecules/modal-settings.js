import React from 'react';
import { useStore } from 'effector-react';

import { ModalWindow, ToggleWithText } from 'ui';
import { $session, optionsChange } from 'features/common';
import { accountAPI } from 'api/account';

export const ModalSettings = ({ isOpen, toClose }) => {
  const session = useStore($session);

  const elements = [
    { id: 'linkTransitions', text: 'Tracking the number of clicks on links' }
  ];

  return isOpen ? (
    <ModalWindow toClose={toClose}>
      {elements.map(({ id, text }) => (
        <ToggleWithText
          text={text}
          key={id}
          id={id}
          toggle={() => clickSettings(id, session[id])}
          defaultChecked={session[id] ? session[id] : false}
        />
      ))}
    </ModalWindow>
  ) : null;
};

const clickSettings = (id, value) => {
  const field = { [id]: !value };

  optionsChange(field);

  accountAPI
    .changeOptionsCreatedLink(field)
    .catch(() => optionsChange({ [id]: value }));
};
