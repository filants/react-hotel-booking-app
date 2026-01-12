import styled from 'styled-components';

const FormResponseContainer = ({ className, children, type }) => (
	<div className={`${className} ${type}`}>{children}</div>
);
export const FormResponse = styled(FormResponseContainer)`
	&.success,
	&.error {
		padding: 10px 5px;
		border-radius: 6px;
		text-align: center;
		margin-top: 15px;
		font-size: 13px;
		line-height: 20px;
	}

	&.success::before,
	&.error::before,
	&.error-input::before {
		display: inline-block;
		width: 10px;
		height: 10px;
		content: '';
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		margin-right: 5px;
		flex-shrink: 0;
	}
	&.success {
		background-color: rgb(198 227 204);
		color: rgb(60 68 62);
		&::before {
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 362.3 362.3'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23307a43; %7D %3C/style%3E%3C/defs%3E%3C!-- Generator: Adobe Illustrator 28.7.3, SVG Export Plug-In . SVG Version: 1.2.0 Build 164) --%3E%3Cg%3E%3Cg id='Layer_1'%3E%3Cpath class='cls-1' d='M181.1,0C81.1,0,0,81.1,0,181.1s81.1,181.1,181.1,181.1,181.1-81.1,181.1-181.1S281.2,0,181.1,0ZM298.5,144c-8.3,9.2-17.1,18-25.6,27-30.6,32-61.3,63.9-91.8,96-5.1,5.3-10.6,9.7-17.9,11.5-12.3,3-23.4.3-32.2-8.6-22-22.1-43.7-44.6-65.5-67.1-5.8-6-8.4-13.4-8.2-21.8.3-14.7,7.6-24.9,20.6-31,12.9-6,27.6-3.4,37.5,6.5,11.5,11.5,22.7,23.2,34.1,34.8,4.5,4.6,4.5,4.6,8.9,0,29-30.5,58.1-61,87-91.6,9.7-10.3,21.3-14.4,35-10.2,13.9,4.2,22.6,13.8,25.4,28.1,2,9.9-.5,19-7.2,26.5Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		}
	}
	&.error {
		background-color: #d400002b;
		color: #d40000;
		&::before {
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 28.7.3, SVG Export Plug-In . SVG Version: 9.03 Build 54978) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 384 384' style='enable-background:new 0 0 384 384;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23D40000;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M198.4,384c-4.5,0-9,0-13.5,0c-5.8-0.6-11.6-1-17.4-1.8c-35.3-4.8-67.3-17.8-95-40.3 c-41-33.3-64.8-76.1-70.9-128.7c-0.5-4.4-1-8.9-1.6-13.3c0-5,0-10,0-15c0.3-1.7,0.6-3.4,0.9-5.1c1.2-8.7,1.7-17.6,3.5-26.2 c11.5-53.4,40.5-94.9,86.8-123.8c41.6-26,87.1-34.2,135.2-25.4c44.7,8.1,82.1,29.7,111.2,64.6c39.5,47.4,53.2,102,41.2,162.5 c-8.5,43.1-30.4,78.7-63.9,107.1c-29.5,25-63.6,39.7-102.1,43.9C208,382.9,203.2,383.5,198.4,384z M236.4,191.7 c1.6-1.1,2.9-1.7,3.9-2.6c14.2-14.2,28.5-28.3,42.6-42.6c11.9-12.1,13.5-29.2,4.1-42.2c-11.8-16.3-34.5-17.9-49.3-3.3 c-14.3,14.1-28.4,28.4-42.6,42.6c-1,1-2.1,2-3.3,3.2c-1.2-1.1-2.2-2-3.1-3c-14.3-14.3-28.5-28.6-42.9-42.8 c-12.7-12.6-31.4-13.4-44.3-2.1c-14.4,12.5-14.8,33.6-0.8,47.7c14.1,14.3,28.4,28.4,42.6,42.6c1,1,2,2.1,3.4,3.7 c-1.5,1.2-2.8,2-3.9,3.1c-14.1,14.1-28.3,28.2-42.3,42.4c-10.9,11-13.2,26.4-5.9,39.1c10.6,18.7,35.4,21.9,51.1,6.4 c14.4-14.2,28.6-28.6,42.9-42.8c1-1,2.1-2,3.9-3.6c1,1.4,1.7,2.7,2.6,3.6c14.1,14.1,28.3,28.2,42.3,42.4 c8.1,8.2,17.9,11.9,29.2,9.8c12.5-2.3,21.2-9.7,25-22c3.8-12.3,0.9-23.2-8-32.4c-10.4-10.7-21.1-21.2-31.7-31.8 C247,202.3,242.2,197.5,236.4,191.7z'/%3E%3C/g%3E%3C/svg%3E%0A");
		}
	}
	&.error-input {
		margin-top: 10px;
		display: flex;
		align-items: baseline;
		font-size: 13px;
		line-height: 20px;
		color: #d40000;
		&::before {
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 28.7.3, SVG Export Plug-In . SVG Version: 9.03 Build 54978) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 384 384' style='enable-background:new 0 0 384 384;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23D40000;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M198.4,384c-4.5,0-9,0-13.5,0c-5.8-0.6-11.6-1-17.4-1.8c-35.3-4.8-67.3-17.8-95-40.3 c-41-33.3-64.8-76.1-70.9-128.7c-0.5-4.4-1-8.9-1.6-13.3c0-5,0-10,0-15c0.3-1.7,0.6-3.4,0.9-5.1c1.2-8.7,1.7-17.6,3.5-26.2 c11.5-53.4,40.5-94.9,86.8-123.8c41.6-26,87.1-34.2,135.2-25.4c44.7,8.1,82.1,29.7,111.2,64.6c39.5,47.4,53.2,102,41.2,162.5 c-8.5,43.1-30.4,78.7-63.9,107.1c-29.5,25-63.6,39.7-102.1,43.9C208,382.9,203.2,383.5,198.4,384z M236.4,191.7 c1.6-1.1,2.9-1.7,3.9-2.6c14.2-14.2,28.5-28.3,42.6-42.6c11.9-12.1,13.5-29.2,4.1-42.2c-11.8-16.3-34.5-17.9-49.3-3.3 c-14.3,14.1-28.4,28.4-42.6,42.6c-1,1-2.1,2-3.3,3.2c-1.2-1.1-2.2-2-3.1-3c-14.3-14.3-28.5-28.6-42.9-42.8 c-12.7-12.6-31.4-13.4-44.3-2.1c-14.4,12.5-14.8,33.6-0.8,47.7c14.1,14.3,28.4,28.4,42.6,42.6c1,1,2,2.1,3.4,3.7 c-1.5,1.2-2.8,2-3.9,3.1c-14.1,14.1-28.3,28.2-42.3,42.4c-10.9,11-13.2,26.4-5.9,39.1c10.6,18.7,35.4,21.9,51.1,6.4 c14.4-14.2,28.6-28.6,42.9-42.8c1-1,2.1-2,3.9-3.6c1,1.4,1.7,2.7,2.6,3.6c14.1,14.1,28.3,28.2,42.3,42.4 c8.1,8.2,17.9,11.9,29.2,9.8c12.5-2.3,21.2-9.7,25-22c3.8-12.3,0.9-23.2-8-32.4c-10.4-10.7-21.1-21.2-31.7-31.8 C247,202.3,242.2,197.5,236.4,191.7z'/%3E%3C/g%3E%3C/svg%3E%0A");
		}
	}
`;
