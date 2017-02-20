import React from 'react';
import ColorSlider from "../presentational/ColorSlider.jsx";
import RaisedButton from "material-ui/RaisedButton";
import ButtonArray from "../presentational/ButtonArray.jsx";

export default class DisplaysPanel extends React.Component {
	constructor(props) {
		super(props);

		this.handleDragStop = this.handleDragStop.bind(this);
		this.handleButtonArray = this.handleButtonArray.bind(this);
	}

	handleButtonArray(source) {
		console.log(source);
		this.props.httpCallback("POST", "display/" + source, null);
	}

	// when slider stops moving send data to server
	handleDragStop(event, value, source) {
		// url is in form of "control/sliderColor/value"
		this.props.httpCallback("POST", "display/" + source + "/" + value, null);
	}

	render() {
		const divStyle = {
			display: 'flex',
	    flexDirection: 'row',
	    justifyContent: 'center',
			height: "100%"
		};

		return (
			<div>
				<div style={divStyle}>
					<br/>
					<ColorSlider
						onDragStop={(e,val) => this.handleDragStop(e,val,"red")}
						label="Red"
						margin="50"
						height={300}
						labelStyle={{fontSize: 20}}
					/>
					<ColorSlider
						onDragStop={(e,val) => this.handleDragStop(e,val,"green")}
						label="Green"
						margin="50"
						height={300}
						labelStyle={{fontSize: 20}}
					/>
					<ColorSlider
						onDragStop={(e,val) => this.handleDragStop(e,val,"blue")}
						label="Blue"
						margin="50"
						height={300}
						labelStyle={{fontSize: 20}}
					/>
				</div>
				<br/>
				<div>
					<ButtonArray
						onButtonClick={this.handleButtonArray}
					/>
				</div>
				<br/>
			</div>
		);
	}
}
