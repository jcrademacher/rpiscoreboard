import React from 'react';
import FlatButton from "material-ui/FlatButton";

export default class ButtonArray extends React.Component {
	constructor(props) {
		super(props);
	}

	handleButtonClick(source) {
		this.props.onButtonClick(source);
	}

	render() {
		var styles = {
			button: {
				height: 100,
				width: 100,
				margin: 4
			},

			labelStyle: {
				fontSize: 20
			}
		};

		return (
			<div>
				<FlatButton
					label="ff"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("ff")}
				/>
				<FlatButton
					label="goal"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("goal")}
				/>
				<FlatButton
					label="jrad"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("jrad")}
				/>
				<FlatButton
					label="adam"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("adam")}
				/>
				<FlatButton
					label="ff2"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("ff2")}
				/>
				<br/>
				<FlatButton
					label="rt"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("rt")}
				/>
				<FlatButton
					label="c1"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("c1")}
				/>
				<FlatButton
					label="c2"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("c2")}
				/>
				<FlatButton
					label="c3"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("c3")}
				/>
				<FlatButton
					label="sn"
					backgroundColor="#E8D0A9"
					style={styles.button}
					labelStyle={styles.labelStyle}
					onClick={() => this.handleButtonClick("sn")}
				/>
			</div>
		);
	}
}
