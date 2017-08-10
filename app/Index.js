import React from 'react';
import Root from './config/router.js';
import SignIn from './screens/SignIn/Index.js';
import firebase from './config/firebase.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		firebase.init();

		this.state = {
			signedIn: firebase.signedIn,
		};
	}

	render() {
		if (this.state.signedIn) {
			return <Root />;
		}
		else {
			return (
				<SignIn
					onSignIn={() => this.onSignIn()}
					/>
			);
		}
	}

	onSignIn() {
		this.setState({
			signedIn: true,
		});
	}
}
