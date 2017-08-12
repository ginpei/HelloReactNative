import React, { Component } from 'react';
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';
import BasicScreen from '../../views/BasicScreen/Index.js';
import Note from '../../models/Note.js'
import ShortMessage from '../../views/ShortMessage/Index.js';
import firebase from '../../config/firebase.js';

export default class NoteView extends Component {
	get navParams() {
		return this.props.navigation.state.params;
	}

	constructor(props) {
		super(props);
		this.state = {
			note: this.navParams.note,
		};
	}

	componentWillMount() {
		const note = this.state.note
		if (note) {
			this.props.navigation.setParams({
				title: note.title,
			});

			this.listener = (snapshot) => {
				const note = new Note(snapshot);
				console.log('# NoteView: note is updated', note);
				this.setState({ note });
				this.props.navigation.setParams({
					title: note.title,
				});
			};
			note.db.on('value', this.listener);
		}
		else {
			ShortMessage.show('Not found');
			this.props.navigation.goBack();
		}
	}

	componentWillUnmount() {
		const note = this.state.note;
		note.db.off('value', this.listener);
	}

	render() {
		const note = this.state.note;
		if (!note) {
			return <Text>Not found.</Text>
		}

		const sUpdatedAt = new Date(note.updatedAt).toString();
		return (
			<BasicScreen>
				<View style={styles.header}>
					<Text style={styles.title}>{note.title}</Text>
					<Text style={styles.updatedAt}>Last Update: {sUpdatedAt}</Text>
				</View>
				<Text>{note.description}</Text>
			</BasicScreen>
		);
	}

	onItemPress({item}) {
		const { navigate } = this.props.navigation;
		navigate('Second', {item});
	}

	static navigationOptions(props) {
		const params = props.navigation.state.params;
		return {
			title: params ? params.title : 'Note',
			headerRight: (
				<Button
					title="Edit"
					onPress={() => props.navigation.navigate('NoteEdit', { note: params.note })}
					/>
			),
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	header: {
		marginBottom: 10,
	},
	title: {
		fontSize: 30,
	},
	updatedAt: {
		color: '#999',
	},
});
