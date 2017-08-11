import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';

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
		this.props.navigation.navigate('SignIn');
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
