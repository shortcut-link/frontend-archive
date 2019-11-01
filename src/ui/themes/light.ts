import { css } from 'styled-components';

import { createEmbed, material } from 'lib/material-colors';

const palette = {
  primary: {
    initial: createEmbed('Blue', 300),
    hover: createEmbed('Blue', 500)
  },
  decoration: {
    borders: material.palette.Black.Dividers
  }
};

const embed = {
  canvas: css`
    background-color: ${createEmbed('Blue Grey', 50).background};
    color: ${createEmbed('Blue Grey', 50).color};
  `,
  card: css`
    background-color: ${createEmbed('White', 500).background};
    color: ${createEmbed('White', 500).color};
  `
};

export const lightTheme = { palette, embed };

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
