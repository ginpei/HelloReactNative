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
import SignInForm from '../../views/SignInForm/index.js';

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
				<SignInForm
					email={this.state.email}
					password={this.state.password}
					errorMessage={this.state.errorMessage}
					onSubmit={(data) => this.signIn(data)}
					/>
				<Text>or</Text>
				<Button
					title="Sign up"
					onPress={() => this.signUp()}
					/>
			</View>
		);
	}

	signIn({ email, password }) {
		console.log('# submit', this.state);

		this.setState({ email, password, loading: true });
		firebase.signIn(email, password)
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
