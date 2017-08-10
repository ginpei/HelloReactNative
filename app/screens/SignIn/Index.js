import React, { Component } from 'react';
import {
	TextInput,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';
import TextArea from './TextArea.js';
import firebase from '../../config/firebase.js';

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
				<Text>{this.props.text}</Text>
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
		firebase.signIn(this.state.email, this.state.password)
			.then(user => this.props.onSignIn())
			.catch(error => {
				// TODO show error for users
				console.log('# submit: failed', error);
			});
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
