import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default class Account extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Account</Text>
			</View>
		);
	}

	onItemPress({item}) {
		const { navigate } = this.props.navigation;
		navigate('Second', {item});
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
