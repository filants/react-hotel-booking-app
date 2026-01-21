import ChevronSingle from './assets/icon-pagination-chevron-single.svg?react';
import ChevronDouble from './assets/icon-pagination-chevron-double.svg?react';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<button
				title="To the first page"
				className="flipped"
				disabled={page === 1}
				onClick={() => setPage(1)}
			>
				<ChevronDouble />
			</button>
			<button
				title="Previous page"
				className="flipped"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				<ChevronSingle />
			</button>
			<div className="page-number">
				<span>{page}</span> of <span>{lastPage}</span>
			</div>
			<button
				title="Next page"
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				<ChevronSingle />
			</button>
			<button
				title="To the last page"
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				<ChevronDouble />
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: baseline;
	gap: 10px;
	margin-top: auto;
	padding-top: 3rem;
	& .page-number {
		width: 50px;
		text-align: center;
		display: inline-block;
		& span:first-child {
			font-weight: 500;
		}
	}
	& button {
		padding: 1px 5px 0px;
		background-color: inherit;
		border: inherit;
		cursor: pointer;
		transition: opacity 0.2s ease;
		& svg {
			margin-bottom: -1px;
		}
		&.flipped {
			transform: rotate(180deg);
		}
		&:hover {
			opacity: 0.5;
		}
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
`;
