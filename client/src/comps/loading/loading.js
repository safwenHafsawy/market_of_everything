import React from "react";
import "./loading.scss";

const Loading = (props) => {
	return (
		<div id="loading-page">
			<div id="loading-display">
				<h1>Loading...</h1>
				<h3>{props.message}</h3>
			</div>
		</div>
	);
};

Loading.defaultProps = {
	message: "This is the deafult message",
};

export default Loading;
