import React from 'react';
import Slider from 'material-ui/Slider';

export default class ColorSlider extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.value = 235;
	}

	handleChange(event, newVal) {
		this.value = newVal; // value holds current value of slider
	}

	render() {
		var style = {
			height: this.props.height,
			marginLeft: this.props.margin,
			marginRight: this.props.margin,
		};

		return (
			<div>
				<Slider
					onDragStop={(event) => this.props.onDragStop(event, this.value)}
					onChange={this.handleChange}
					style={style}
					axis="y"
					min={0}
					max={235}
					defaultValue={235}
					step={1}
				/>
				<p style={this.props.labelStyle}>{this.props.label}</p>
			</div>
			);
	}
}
