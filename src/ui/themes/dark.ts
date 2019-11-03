import { css } from 'styled-components';

import { createEmbed, material } from 'lib/material-colors';

export const staticDark = css`
  --primary: ${createEmbed('Pink', 300).background};
  --primary-text: ${createEmbed('Pink', 300).color};
  --primary-hover: ${createEmbed('Pink', 400).background};
  --primary-hover-text: ${createEmbed('Pink', 400).color};

  --canvas: ${createEmbed('Blue Grey', 900).background};
  --canvas-text: ${createEmbed('Blue Grey', 900).color};

  --card: ${createEmbed('Blue Grey', 700).background};
  --card-text: ${createEmbed('Blue Grey', 700).color};

  --border: ${material.palette.White.Dividers};
`;
