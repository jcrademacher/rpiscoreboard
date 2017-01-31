import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Title = React.createClass({
  render() {
    var style = {
      textAlign: "center",
      //backgroundImage: "url(" + "../../resources/rink.png" + ")",
    };

    return (
      <div style={style}>
        <p style={{fontSize: 40, fontWeight: "500", height: 30}}>Rad-Cinus Memorial Rink</p>
        <p>EST. 2011</p>
      </div>
    );
  }
});

export default Title;
