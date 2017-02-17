import React from 'react';
import ColorSlider from "./ColorSlider.jsx";

export default class DisplaysPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const divStyle = {
			display: 'flex',
	    flexDirection: 'row',
	    justifyContent: 'center',
			height: "400"
		};

		return (
			<div style={divStyle}>
				<br/>
				<ColorSlider label="Red" margin="50" height={200} defaultValue={235}/>
				<ColorSlider label="Green" margin="50" height={200}/>
				<ColorSlider label="Blue" margin="50" height={200}/>
			</div>
		);
	}
}
