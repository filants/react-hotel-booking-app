import styled from 'styled-components';

const FullPageContainerDiv = styled.div`
	padding: 40px;
	@media (max-width: 768px) {
		padding: 20px;
	}
	& .cards-container {
		display: grid;
		gap: 30px;
		grid-template-columns: repeat(1, 1fr);
		@media (min-width: 700px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (min-width: 1200px) {
			grid-template-columns: repeat(4, 1fr);
		}
		& > div,
		> a {
			height: 255px;
			border-radius: 12px;
			overflow: hidden;
			box-shadow: 3px 3px 6px rgb(0, 0, 0, 0.2);
		}
	}
`;

export const FullPageContainer = ({ children }) => (
	<FullPageContainerDiv>{children}</FullPageContainerDiv>
);
