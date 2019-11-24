import React from 'react';
import { useStore } from 'effector-react';

import { ModalWindow, Toggle } from 'ui';
import { $session, optionsChange } from 'features/common';
import { accountAPI, ParameterCreatedLink } from 'api/account';

interface ModalSettingsProps {
  isOpen: boolean;
  closing: () => void;
}

export const ModalSettings = ({ isOpen, closing }: ModalSettingsProps) => {
  const session = useStore($session);

  const elements: { parameter: ParameterCreatedLink; text: string }[] = [
    {
      parameter: 'linkTransitions',
      text: 'Tracking the number of clicks on links'
    }
  ];

  return isOpen ? (
    <ModalWindow closing={closing}>
      {elements.map(({ parameter, text }) => (
        <Toggle
          key={parameter}
          id={parameter}
          switching={() => clickSettings(parameter, session[parameter])}
          checked={session[parameter] ? true : false}
        >
          {text}
        </Toggle>
      ))}
    </ModalWindow>
  ) : null;
};

const clickSettings = (parameter: ParameterCreatedLink, value: boolean) => {
  const field = { [parameter]: !value };

  optionsChange(field);

  accountAPI
    .changeOptionsCreatedLink(parameter, !value)
    .catch(() => optionsChange({ [parameter]: value }));
};
