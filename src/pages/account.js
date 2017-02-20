import React from 'react';
import ReactDOM from 'react-dom';
import AccountMain from '../components/containers/AccountMain.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
	fontFamily: "Raleway, Roboto, sans-serif",
});

const AccountApp = () => {
	return (
		<MuiThemeProvider muiTheme={muiTheme}>
			<AccountMain/>
		</MuiThemeProvider>
	);
}

ReactDOM.render(
  <AccountApp/>,
  document.getElementById('app')
);
