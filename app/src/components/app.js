import React from 'react';

import { Page } from 'react-onsenui';

import Splash from './pages/splash';
import * as socket from '../socket';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      error: "",
      connecting: true,
      isConnected: false,
      proceedAnyway: false,
      socket: null
    }
  }

  componentDidMount() {
    this.openSocket();
  }

  openSocket() {
    this.setState({
      socket: null,
      connecting: true,
      isConnected: false,
      error: ""
    })

    socket.init()
    .then((socket) => {
      this.setState({
        socket: socket,
        connecting: false,
        isConnected: true
      });

      socket.addEventListener("error", this.setError.bind(this));
    })
    .catch((error) => {
      this.setError(error);
    });
  }

  setError(error) {
    this.setState({
      socket: null,
      error: error,
      connecting: false,
      isConnected: false
    });
  }

	render() {
    const {
      error,
      isConnected,
      connecting,
      socket,
      proceedAnyway
    } = this.state;

		return (
      <Page>
        {
        isConnected && socket || proceedAnyway ?
          <h2>Connected!</h2>
        :
          <Splash
            error={error}
            connecting={connecting}
            onTryAgain={() => this.openSocket()}
            proceedAnyway={() => this.setState({ proceedAnyway: true })}
          />
        }
      </Page>
    );
	}
}
