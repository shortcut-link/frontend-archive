import { createGlobalStyle } from 'styled-components';

const fontFace = (name, src, fontWeight = 'normal', fontStyle = 'normal') => `
	@font-face{
		font-family: "${name}";
		src: url(${require(`../../../public/fonts/${src}.ttf`)})  format("truetype");

		font-style: ${fontStyle};
		font-weight: ${fontWeight};
	}
`;

export const GlobalStyle = createGlobalStyle`
	${fontFace('Open Sans', 'OpenSans-Light', 300)};
	${fontFace('Open Sans', 'OpenSans-Regular', 400)};
	${fontFace('Open Sans', 'OpenSans-Bold', 700)};

	body {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		font-size: 15px;
	};

	#root {
		display: flex;
		align-items: stretch;
		flex-flow: column nowrap;
	};

	* {
		box-sizing: border-box;
	}
`;
