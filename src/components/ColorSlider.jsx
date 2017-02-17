import React from 'react';
import Slider from 'material-ui/Slider';

export default class ColorSlider extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var style = {
			height: this.props.height,
			marginLeft: this.props.margin,
			marginRight: this.props.margin,
		};

		return (
			<div>
				<Slider style={style} axis="y" min={0} max={235} defaultValue={235}/>
				<p>{this.props.label}</p>
			</div>
			);
	}
}
