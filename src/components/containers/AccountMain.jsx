import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class AccountMain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			usernameError: false,
			passwordError: false
		}

		this.password1 = "";
		this.password2 = "";
	}

	// checks if confirm password and original password match
	doPasswordsMatch(event, newVal, source) {
		if(source == "original")
			this.password1 = newVal;
		if(source == "confirm")
			this.password2 = newVal;

		if(this.password1 == this.password2)
			this.setState({ passwordError: false });
		else
			this.setState({ passwordError: true });
	}

	render() {

		var styles = {
			div: {
				textAlign: "center",
				fontFamily: "Raleway, Roboto, sans-serif",
	      fontWeight: "300",
	      color: "#3a3a3a"
			},

			title: {
				fontSize: 35,
			},

			paper: {
				backgroundColor: "#eaeaea",
				height: "600",
				width: "500",
				margin: "auto"
			},

			textfield: {
				width: "85%",
				margin: 25
			},

			buttons: {
				width: "85%",
				height: "50",
				margin: 15
			}
		};

		return (
			<div style={styles.div}>
				<br/>
				<span style={styles.title}>Create a new account</span>
				<br/><br/>
				<Paper
					zDepth={1}
					style={styles.paper}
				>
					<form>
						<br/>
						<TextField
							hintText="Username..."
							hintStyle={{fontSize: 20}}
							inputStyle={{fontSize: 20}}
							style={styles.textfield}
						/>
						<TextField
							hintText="Name to display..."
							hintStyle={{fontSize: 20}}
							inputStyle={{fontSize: 20}}
							style={styles.textfield}
						/>
						<TextField
							hintText="Password..."
							hintStyle={{fontSize: 20}}
							inputStyle={{fontSize: 20}}
							style={styles.textfield}
							type="password"
							onChange={(event, newVal) => this.doPasswordsMatch(event, newVal, "original")}
						/>
						<TextField
							hintText="Confirm password..."
							hintStyle={{fontSize: 20}}
							inputStyle={{fontSize: 20}}
							style={styles.textfield}
							type="password"
							onChange={(event, newVal) => this.doPasswordsMatch(event, newVal, "confirm")}
							errorText={
								this.state.passwordError ? "Passwords do not match" : ""
							}
						/>
						<RaisedButton
							label="Create account"
							style={styles.buttons}
							backgroundColor="#c1dad6"
							labelStyle={{fontSize: 20}}
						/>
						<FlatButton
							label="Back"
							style={styles.buttons}
							backgroundColor="#E8D0A9"
							labelStyle={{fontSize: 20}}
							onClick={() => window.location = "./index.html"}
						/>
					</form>
				</Paper>
			</div>
		);
	}
}
