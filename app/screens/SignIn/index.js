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
			errorMessage: '',
			loading: true,
			email: 'anonymous@example.com',
			password: '123123',
		};
	}

	componentWillMount() {
		firebase.initAuth()
			.then(_ => {
				if (firebase.signedIn) {
					this.goToTop();
				}
				else {
					this.setState({ loading: false });
				}
			});
	}

	render() {
		if (this.state.loading) {
			return <LoadingIndicator />;
		}

		return (
			<View style={styles.container}>
				<Text>{this.props.text}</Text>
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
					>{this.state.errorMessage}</Text>
				<Button
					title="Sign In"
					onPress={() => this.submit()}
					/>
				<Text>or</Text>
				<Button
					title="Anonymouse sign up"
					onPress={() => this.signUp()}
					/>
			</View>
		);
	}

	submit() {
		console.log('# submit', this.state);

		this.setState({ loading: true });
		firebase.signIn(this.state.email, this.state.password)
			.then(user => this.goToTop())
			.catch(error => {
				console.log('# submit: failed', error);
				this.setState({ loading: false });

				this.setState({
					errorMessage: `Failed to sign in; ${error.message}`,
				});
			});
	}

	signUp() {
		ask( 'Do you want to create a new account without signing in?', () => {
			this.setState({ loading: true });

			firebase.signUp()
				.then(() => this.goToTop())
				.catch(error => {
					console.log('# failed to sign up', error);
					this.setState({ loading: false });

					this.setState({
						errorMessage: `Failed to sign in; ${error.message}`,
					});
				});
		});
	}

	goToTop() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Top' }),
			],
		});
		this.props.navigation.dispatch(resetAction);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		margin: 16,
	},
	titledTextInput: {
		width: '100%',
	},
	errorMessage: {
		color: '#f00',
	},
});
