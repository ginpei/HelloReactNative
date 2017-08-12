import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

import BasicScreen from '../../views/BasicScreen/Index.js';
import NoteForm from '../../views/NoteForm/Index.js';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';
import ShortMessage from '../../views/ShortMessage/Index.js';
import Note from '../../models/Note.js';
import firebase from '../../config/firebase.js';

export default class NoteEdit extends React.Component {
	get navParams() {
		return this.props.navigation.state.params;
	}

	constructor(props) {
		super(props);
		const note = this.navParams.note;
		this.state = {
			description: note.description,
			loading: false,
			title: note.title,
		};
	}

	render() {
		if (this.state.loading) {
			return <LoadingIndicator />
		}

		return (
			<BasicScreen>
				<NoteForm
					description={this.state.description}
					isNew={false}
					title={this.state.title}
					style={styles.form}
					onChange={updates => this.setState(updates)}
					onSubmit={() => this.update()}
					/>
				<Button
					color="#f00"
					title="Delete"
					onPress={() => this.askDelete()}
					/>
			</BasicScreen>
		);
	}

	update() {
		this.setState({ loading: true });

		const { title, description } = this.state;
		const note = this.navParams.note;
		note.title = title;
		note.description = description;
		note.save()
			.then(_ => {
				ShortMessage.show('Updated a note.');
				this.props.navigation.goBack();
			})
			.catch(error => {
				this.setState({ loading: false });
				ShortMessage.show(`Failed to update a note: ${error && error.message}`);
			});
	}

	askDelete() {
		const title = null;
		const message = 'Are you sure you want to delete this note?';
		const buttons = [
			{ text: 'Cancel' },
			{ text: 'Delete', onPress: () => this.delete() },
		];
		Alert.alert(title, message, buttons);
	}

	delete() {
		this.setState({ loading: true });

		const note = this.navParams.note;
		note.delete()
			.then(() => this.props.navigation.goBack() )
			.catch(error => {
				this.setState({ loading: false });
			});
	}
}

const styles = StyleSheet.create({
	form: {
		marginBottom: 50,
	},
});
