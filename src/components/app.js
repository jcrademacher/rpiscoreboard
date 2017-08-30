import React from 'react';

import { Page } from 'react-onsenui';

import Splash from './pages/splash';
import Navigator from './pages/navigator';
import PrimaryControls from './pages/controls/primary'
import * as socket from '../socket';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      connecting: true,
      isConnected: false,
      proceedAnyway: false,
      socket: null,
      errorMsg: ""
    }
  }

  componentDidMount() {
    this.openSocket();
  }

  timeout() {
    const {
      connecting,
      isConnected
    } = this.state;

    if(connecting && !isConnected) {
      this.setState({
        connecting: false,
        isConnected: false,
        errorMsg: "Connection timeout"
      });
    }
  }

  openSocket() {
    setTimeout(this.timeout.bind(this), 5000);

    this.setState({
      socket: null,
      connecting: true,
      isConnected: false
    })

    socket.init()
    .then((socket) => {
      this.setState({
        socket: socket,
        connecting: false,
        isConnected: true
      });

      socket.addEventListener("close", () => this.setError("Connection closed"));
      socket.addEventListener("error", () => this.setError("Something went wrong"));
    })
    .catch(() => {
      this.setError("Connection refused");
    });
  }

  setError(msg) {
    this.setState({
      socket: null,
      connecting: false,
      isConnected: false,
      errorMsg: msg
    });
  }

	render() {
    const {
      errorMsg,
      isConnected,
      connecting,
      socket,
      proceedAnyway
    } = this.state;

		return (
      <Page>
        {
        isConnected && socket || proceedAnyway ?
          <Navigator
            isConnected={isConnected}
          >
            <PrimaryControls
              socket={socket}
            />
            <h3>Coming soon...</h3>
          </Navigator>
        :
          <Splash
            errorMsg={errorMsg}
            connecting={connecting}
            onTryAgain={() => this.openSocket()}
            proceedAnyway={() => this.setState({ proceedAnyway: true })}
          />
        }
      </Page>
    );
	}
}
