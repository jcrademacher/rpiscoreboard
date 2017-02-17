import React from 'react';
import LinearProgress from "material-ui/LinearProgress";
import ColorSlider from "./ColorSlider.jsx";

export default class DisplaysPanel extends React.Component {
	constructor(props) {
		super(props);

		this.handleDragStop = this.handleDragStop.bind(this);

		this.state = {
			progress: 0
		};
	}

	// when slider stops moving send data to server
	handleDragStop(event, source) {
		var xhr = new XMLHttpRequest();

		this.setState({progress: 0});

		xhr.onreadystatechange = (e) => {
			var p;

			// running through all readyState possibilities, updating progress bar as such
			switch(xhr.readyState) {
				case 1:
					p = 25;
					break;
				case 2:
					p = 50;
					break;
				case 3:
					p = 75;
					break;
				case 4:
					p = 100;
					break;
			}

			// not found
			if(xhr.status != 200)
				p = 0;

			this.setState({
				progress: p
			});

			if(xhr.readyState == 4) {
				setTimeout(() => this.setState({progress: 0}), 2000); // reset progress to 0 after 2 seconds
			}
		};

		xhr.open("POST", "control/colors/" + source + "/" + event.target.value, true);
		xhr.send();

	}

	render() {
		const divStyle = {
			display: 'flex',
	    flexDirection: 'row',
	    justifyContent: 'center',
		};

		return (
			<div>
				<LinearProgress mode="determinate" value={this.state.progress}/>
				<div style={divStyle}>
					<br/>
					<ColorSlider onDragStop={(e) => this.handleDragStop(e,"red")} label="Red" margin="50" height={300} labelStyle={{fontSize: 20}}/>
					<ColorSlider onDragStop={(e) => this.handleDragStop(e,"green")} label="Green" margin="50" height={300} labelStyle={{fontSize: 20}}/>
					<ColorSlider onDragStop={(e) => this.handleDragStop(e,"blue")} label="Blue" margin="50" height={300} labelStyle={{fontSize: 20}}/>
				</div>
			</div>
		);
	}
}
