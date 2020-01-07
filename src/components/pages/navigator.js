import React, { Component } from 'react';
import { Page, Tabbar, Tab, Toolbar } from 'react-onsenui';

import StatusBar from './status-bar';


export default class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0
    }
  }

  renderTabs() {
    const tab = (label, icon) => (
      <Tab
        label={label}
        icon={icon}
      />
    );

    const pageWrapper = (children) => (
      <Page>
        {children}
      </Page>
    )

    return [
      {
        content: pageWrapper(this.props.children[0]),
        tab: tab("Home", "md-home")
      },
      {
        content: pageWrapper(this.props.children[1]),
        tab: tab("Colors", "md-invert-colors")
      },
      {
        content: pageWrapper(this.props.children[2]),
        tab: tab("About", "md-info")
      }
    ];
  }

  renderToolbar() {
    return (
      <StatusBar
        isConnected={this.props.isConnected}
        index={this.state.tabIndex}
      />
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <Tabbar
          position="auto"
          index={this.state.tabIndex}
          onPreChange={(event) =>
            {
              if (event.index != this.state.tabIndex) {
                this.setState({tabIndex: event.index});
              }
            }
          }
          renderTabs={this.renderTabs.bind(this)}
        />
      </Page>
    );
  }
}
