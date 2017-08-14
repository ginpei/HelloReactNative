import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import NoteTable from './NoteTable.js'
import { DrawerNavigator } from 'react-navigation';
import LoadingIndicator from '../../views/LoadingIndicator/index.js';
import Note from '../../models/Note.js'
import ShortMessage from '../../views/ShortMessage/index.js';
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
		const db = Note.getRefForUser(user);
		db.on('value', snapshot => {
			this.setState({ loading: false, notes: Note.snapshotToArray(snapshot) });
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

	onItemPress({ note }) {
		const { navigate } = this.props.navigation;
		navigate('NoteView', { note });
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
