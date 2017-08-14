import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { NavigationActions } from 'react-navigation';

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
			<View style={styles.container}>
				<Text>Account</Text>
				<Button
					title="Sign Out"
					onPress={() => this.askSignOut()}
					/>
			</View>
		);
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
				this.goToSignIn();
			})
			.catch(error => {
				console.error('# signOut', error);
			});
	}

	goToSignIn() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'SignIn' }),
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
});
