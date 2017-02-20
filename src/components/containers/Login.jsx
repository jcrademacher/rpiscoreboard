import React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	createNewAccount() {

	}

	signIn() {
		console.log(this);
	}

	render() {
		var styles = {
			paper: {
				backgroundColor: "#eaeaea",
				height: "400",
				width: "400",
				margin: "auto"
			},

			username: {
				fontSize: 20,
			},

			textField: {
				width: "320"
			},

			buttons: {
				width: "320",
				height: "45",
				margin: 10
			}
		};

		return (
			<div>
				<p style={{fontSize: 60, margin: 40}}>Sign in</p>
				<Paper style={styles.paper}>
					<br/><br/><br/>
					<form>
						<TextField
							hintText="Username..."
							hintStyle={styles.username}
							inputStyle={styles.username}
							style={styles.textField}
						/>
						<br/><br/><br/>
						<TextField
							hintText="Password..."
							hintStyle={styles.username}
							inputStyle={styles.username}
							style={styles.textField}
							type="password"
						/>
						<br/><br/><br/>
						<FlatButton
							backgroundColor="#c1dad6"
							label="Sign in"
							labelStyle={{fontSize: 20}}
							style={styles.buttons}
							onClick={() => this.signIn()}
						/>
						<br/>
						<FlatButton
							label="Create new account"
							backgroundColor="#E8D0A9"
							labelStyle={{fontSize: 15}}
							style={styles.buttons}
							href="account.html"
						/>
					</form>
				</Paper>
				<br/>
				<br/>
			</div>
		);
	}
}

const CenterView = () => {

}
