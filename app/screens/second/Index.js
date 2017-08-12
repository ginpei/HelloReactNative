import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			message: 'Hello?',
		};
	}

	render() {
		const message = this.state.message;
		return (
			<View style={styles.container}>
				<Text>Welcome to the 2nd screen!</Text>
				<Text>{message}</Text>
				<Button onPress={() => this.onclick()} title={`Hello From ${this.props.navigation.state.params.note.title}`} />
			</View>
		);
	}

	onclick() {
		this.setState({
			message: 'Yah! Hello!!',
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
