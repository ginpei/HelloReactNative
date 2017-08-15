import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import firebase from '../../config/firebase.js';
import LoadingIndicator from '../../views/LoadingIndicator/index.js';

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
		};
	}

	componentWillMount() {
		firebase.initAuth()
			.then(_ => {
				if (firebase.signedIn) {
					this.goTo('Top');
				}
				else {
					this.goTo('SignIn');
				}
			});
	}

	render() {
		return <LoadingIndicator />;
	}

	goTo(routeName) {
		console.debug('# Boot: ', routeName);
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName }),
			],
		});
		this.props.navigation.dispatch(resetAction);
	}
}
