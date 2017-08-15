import React, { Component } from 'react';
import {
	ActivityIndicator,
	TextInput,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';
import firebase from '../../config/firebase.js';
import { NavigationActions } from 'react-navigation'
import { ask } from '../../views/dialog/index.js';
import LoadingIndicator from '../../views/LoadingIndicator/index.js';
import SignInForm from '../../views/SignInForm/index.js';

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errorMessage: '',
			loading: false,
			email: 'anonymous@example.com',
			password: '123123',
			signedIn: firebase.signedIn,
		};
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
				{!this.state.signedIn && <Text>or</Text>}
				{!this.state.signedIn && <Button
					title="Sign up"
					onPress={() => this.signUp()}
					/>}
			</View>
		);
	}

	signIn({ email, password }) {
		console.log('# submit', this.state);

		this.setState({ email, password, loading: true });
		let p;
		if (this.state.signedIn) {
			p = firebase.linkToEmail(email, password)
				.then(() => {
					const callback = this.props.navigation.state.params.onSignIn;
					if (typeof callback === 'function') {
						callback();
					}
					this.props.navigation.goBack()
				});
		}
		else {
			p = firebase.signIn(email, password)
				.then(user => this.goTo('Top'));
		}

		p.catch(error => {
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
				.then(() => this.goTo('Top'))
				.catch(error => {
					console.log('# failed to sign up', error);
					this.setState({ loading: false });

					this.setState({
						errorMessage: `Failed to sign in; ${error.message}`,
					});
				});
		});
	}

	goTo(routeName) {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: routeName }),
			],
		});
		this.props.navigation.dispatch(resetAction);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
});
