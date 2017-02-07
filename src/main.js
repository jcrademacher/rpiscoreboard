import React from 'react';
import ReactDOM from 'react-dom';
import Content from "./components/Content.jsx";
import Title from './components/Title.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './components/MainView.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
	fontFamily: "Raleway, Roboto, sans-serif",
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Content>
      <Title/>
      <MainView/>
    </Content>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
