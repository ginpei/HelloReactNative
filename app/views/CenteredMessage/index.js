import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class CenteredMessage extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>{this.props.message}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
});
