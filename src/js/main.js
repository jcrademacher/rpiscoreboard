import React from 'react';
import ReactDOM from 'react-dom';
import Content from "../components/presentational/Content.jsx";
import Title from '../components/presentational/Title.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from '../components/presentational/MainView.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {createStore} from "redux";
import allReducers from './reducers';
import {Provider} from 'react-redux';

const muiTheme = getMuiTheme({
	fontFamily: "Raleway, Roboto, sans-serif",
});

// redux store
const store = createStore(allReducers);

class App extends React.Component {
	render() {

		return (
			<Provider store={store}>
			  <MuiThemeProvider muiTheme={muiTheme}>
			    <Content>
			      <Title/>
			      <MainView/>
			    </Content>
			  </MuiThemeProvider>
			</Provider>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
