import React, { Component } from 'react';
import {
	ActivityIndicator,
	TextInput,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';
import TitledTextInput from '../../views/TitledTextInput/index.js';
import firebase from '../../config/firebase.js';
import { NavigationActions } from 'react-navigation'
import ShortMessage from '../../views/ShortMessage/index.js';
import { ask } from '../../views/dialog/index.js';
import LoadingIndicator from '../../views/LoadingIndicator/index.js';

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: props.email || '',
			password: props.password || '',
		};
	}

	render() {
		// const style = [{ width: '100%' }, this.props.style];
		const style = [styles.container, this.props.style];
		return (
			<View style={style}>
				<TitledTextInput
					style={styles.titledTextInput}
					label="Email"
					value={this.state.email}
					onChangeText={(text) => this.setState({ email: text })}
					/>
				<TitledTextInput
					style={styles.titledTextInput}
					label="Password"
					value={this.state.password}
					secureTextEntry={true}
					onChangeText={(text) => this.setState({ password: text })}
					/>
				<Text
					style={styles.errorMessage}
					>{this.props.errorMessage}</Text>
				<Button
					title="Sign In"
					onPress={() => this.submit()}
					/>
			</View>
		);
	}

	submit() {
		const { email, password } = this.state;
		this.props.onSubmit({ email, password });
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '100%',
	},
	titledTextInput: {
		width: '100%',
	},
	errorMessage: {
		color: '#f00',
		minHeight: 20,
	},
});
