import { createEmbed } from '../index';

it('expecting pink (300) should set the background and text color', () => {
  const embed = createEmbed('Pink', 300);

  expect(embed.background).toEqual('#F06292');
  expect(embed.color).toEqual('White');
});
