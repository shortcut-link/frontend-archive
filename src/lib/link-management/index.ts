import { LinkParameter, LinkParameterValue, Link } from 'api/link';
import { FoundLink } from 'api/admin/link';
import { formattingShortedURL } from '../formatting';

export type ParametersType = LinkParameter | 'remove';

type ChangeLink = (value: LinkParameterValue) => void;
type RemoveLink = (payload: void) => void;

interface changeLinkParameterProps {
  parameter: ParametersType;
  link: Link | FoundLink;
  changeLink: ChangeLink;
  removeLink: RemoveLink;
  linkAPI: {
    changeParameter: (
      url: string,
      parameter: LinkParameter,
      value: LinkParameterValue
    ) => void;
    remove: (url: string) => void;
  };
}

// TODO: remove any
export const changeLinkParameterHandler = ({
  parameter,
  link,
  changeLink,
  removeLink,
  linkAPI
}: changeLinkParameterProps) => {
  const { url, transitions } = link;

  if (parameter === 'transitions') {
    const isTracked = typeof transitions === 'number';

    changeLink(isTracked ? null : 0);

    linkAPI.changeParameter(url, parameter, isTracked ? false : true);
  }

  if (parameter === 'remove') {
    const confirm = window.confirm(
      `Are you sure you want to delete the shortened link: ${formattingShortedURL(
        url
      )} ?`
    );

    if (confirm) {
      removeLink();
      linkAPI.remove(url);
    }
  }
};
