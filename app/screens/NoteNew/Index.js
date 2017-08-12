import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const message = this.state.message;
		return (
			<View style={styles.container}>
				<Text>New Note</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 16,
	},
});
