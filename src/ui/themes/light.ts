import { css } from 'styled-components';

import { createEmbed, material } from 'lib/material-colors';

export const staticLight = css`
  --primary: ${createEmbed('Blue', 300).background};
  --primary-text: ${createEmbed('Blue', 300).color};
  --primary-hover: ${createEmbed('Blue', 500).background};
  --primary-hover-text: ${createEmbed('Blue', 500).color};

  --canvas: ${createEmbed('Blue Grey', 50).background};
  --canvas-text: ${createEmbed('Blue Grey', 50).color};

  --card: ${createEmbed('White', 500).background};
  --card-text: ${createEmbed('White', 500).color};

  --border: ${material.palette.Black.Dividers};
`;
