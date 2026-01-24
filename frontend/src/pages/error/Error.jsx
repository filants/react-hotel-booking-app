import { EmptyPageMessage } from '../../components';

export const Error = ({ error }) => (
	<EmptyPageMessage>
		<h1>{error.code}</h1>
		<>{error.message}</>
	</EmptyPageMessage>
);
