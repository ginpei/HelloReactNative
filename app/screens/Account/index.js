import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import BasicScreen from '../../views/BasicScreen/index.js';
import LoadingIndicator from '../../views/LoadingIndicator/index.js';
import { ask } from '../../views/dialog/index.js';
import firebase from '../../config/firebase.js';

export default class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		};
	}

	render() {
		if (this.state.loading) {
			return <LoadingIndicator />;
		}

		return (
			<BasicScreen>
				<View style={styles.accountInformation}>
					{ firebase.anonymous ? this.renderAnonymous() : this.renderEmail() }
				</View>
				<Button
					title="Sign Out"
					color="#f00"
					onPress={() => this.askSignOut()}
					/>
			</BasicScreen>
		);
	}

	renderAnonymous() {
		return [
			<Text style={styles.text}>Anonymous account</Text>,
			<Button
				title="Sign in with Email and password"
				onPress={() => this.signIn()}
				/>,
		];
	}

	renderEmail() {
		return [
			<Text style={styles.text}>Signed in as {firebase.user.email}</Text>,
		];
	}

	signIn() {
		this.props.navigation.navigate('SignIn');
	}

	askSignOut() {
		if (firebase.anonymous) {
			ask('If you sign out as anonymous, you will NOT see your notes again.\n\nAre you sure you want to sign out?', () => {
				this.signOut();
			});
		}
		else {
			this.signOut();
		}
	}

	signOut() {
		this.setState({ loading: true });
		firebase.signOut()
			.then(() => {
				this.goTo('Boot');
			})
			.catch(error => {
				console.error('# signOut', error);
			});
	}

	goTo(routeName) {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: routeName }),
			],
		});
		this.props.navigation.dispatch(resetAction);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	accountInformation: {
		marginBottom: 16,
	},
	text: {
		height: 32,
	},
});
