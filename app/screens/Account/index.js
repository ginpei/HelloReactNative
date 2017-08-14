import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import firebase from '../../config/firebase.js';

export default class Account extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Account</Text>
				<Button
					title="Sign Out"
					onPress={() => this.signOut()}
					/>
			</View>
		);
	}

	signOut() {
		firebase.signOut();
		this.goToSignIn();
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
