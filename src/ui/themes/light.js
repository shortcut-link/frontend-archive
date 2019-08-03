import { css } from 'styled-components';

import { createEmbed } from 'lib/material-colors';

const palette = {
  primary: {
    initial: createEmbed('Blue', 300),
    hover: createEmbed('Blue', 500)
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
