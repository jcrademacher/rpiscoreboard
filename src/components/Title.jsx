import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Title = React.createClass({
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <h1>Rad-Cinus Memorial Rink</h1>
        <h3>EST. 2011</h3>
        <br/>
      </div>
    );
  }
});

export default Title;
