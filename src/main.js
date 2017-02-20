import React from 'react';
import ReactDOM from 'react-dom';
import Content from "./components/presentational/Content.jsx";
import Title from './components/presentational/Title.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './components/presentational/MainView.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
	fontFamily: "Raleway, Roboto, sans-serif",
});

class App extends React.Component {
	render() {

		return (
		  <MuiThemeProvider muiTheme={muiTheme}>
		    <Content>
		      <Title/>
		      <MainView/>
		    </Content>
		  </MuiThemeProvider>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
