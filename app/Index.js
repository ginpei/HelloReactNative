import React from 'react';
import Root from './config/router.js';
import firebase from './config/firebase.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		firebase.init();
	}

	render() {
		return <Root />;
	}
}
