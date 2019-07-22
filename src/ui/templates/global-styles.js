import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
	};

	#root {
		display: flex;
		align-items: stretch;
		flex-flow: column nowrap;
	};
`;
