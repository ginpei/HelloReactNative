import React, { Component } from 'react';
import {
	TextInput,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';
import TextArea from './TextArea.js';

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<TextArea
					style={styles.textArea}
					label="Email"
					value={this.state.email}
					onChangeText={(text) => this.setState({ email: text })}
					/>
				<TextArea
					style={styles.textArea}
					label="Password"
					value={this.state.password}
					secureTextEntry={true}
					onChangeText={(text) => this.setState({ password: text })}
					/>
				<Button
					title="Sign In"
					onPress={() => this.submit()}
					/>
			</View>
		);
	}

	submit() {
		console.log('# submit', this.state);
		this.props.onSignIn();
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		margin: '5%',
	},
	textArea: {
		width: '100%',
	},
});
