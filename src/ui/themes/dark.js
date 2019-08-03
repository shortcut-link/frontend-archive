import { css } from 'styled-components';

import { createEmbed } from 'lib/material-colors';

const palette = {
  primary: {
    initial: createEmbed('Pink', 300),
    hover: createEmbed('Pink', 400)
  }
};

const embed = {
  canvas: css`
    background-color: ${createEmbed('Blue Grey', 900).background};
    color: ${createEmbed('Blue Grey', 900).color};
  `,
  card: css`
    background-color: ${createEmbed('Blue Grey', 700).background};
    color: ${createEmbed('Blue Grey', 700).color};
  `
};

export const darkTheme = { palette, embed };
