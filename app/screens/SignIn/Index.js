import React, { Component } from 'react';
import {
	ActivityIndicator,
	TextInput,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';
import TextArea from './TextArea.js';
import firebase from '../../config/firebase.js';
import { NavigationActions } from 'react-navigation'
import ShortMessage from '../../views/ShortMessage/Index.js';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
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

		this.setState({ loading: true });
		firebase.signIn(this.state.email, this.state.password)
			.then(user => this.goToTop())
			.catch(error => {
				console.log('# submit: failed', error);
				this.setState({ loading: false });

				const message = `Failed to sign in; ${error.message}`;
				ShortMessage.show(message);
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
		margin: '5%',
	},
	textArea: {
		width: '100%',
	},
});
