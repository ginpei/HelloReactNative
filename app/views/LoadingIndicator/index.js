import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default class LoadingIndicator extends Component {
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
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
