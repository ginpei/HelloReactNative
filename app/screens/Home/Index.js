import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import NoteTable from './NoteTable.js'
import { DrawerNavigator } from 'react-navigation';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';
import Note from '../../models/Note.js'
import ShortMessage from '../../views/ShortMessage/Index.js';
import firebase from '../../config/firebase.js';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			notes: [],
		};
	}

	componentWillMount() {
		const user = firebase.user;
		Note.fetchAllFor(user)
			.then(notes => this.setState({ loading: false, notes: notes }))
			.catch(error => {
				ShortMessage.show(`Failed to fetch notes: ${error && error.message}`);
			});
	}

	render() {
		if (this.state.loading) {
			return <LoadingIndicator />;
		}

		return (
			<NoteTable
				notes={this.state.notes}
				onItemPress={(props) => this.onItemPress(props)} />
		);
	}

	onItemPress({item}) {
		const { navigate } = this.props.navigation;
		navigate('Second', {item});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
