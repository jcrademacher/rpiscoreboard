import React from "react";
import Login from "./Login.jsx"

export default class StatsPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Login/>
			</div>
		);
	}
}
