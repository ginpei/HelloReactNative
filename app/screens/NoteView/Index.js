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
		};
	}

	componentWillMount() {
		if (this.navParams.note) {
			this.props.navigation.setParams({
				title: this.navParams.note.title,
			});
		}
		else {
			ShortMessage.show('Not found');
			this.props.navigation.goBack();
		}
	}

	render() {
		const note = this.navParams.note;
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
