import React from 'react';

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
			<NoteForm
				description={this.state.description}
				isNew={false}
				title={this.state.title}
				onChange={updates => this.setState(updates)}
				onSubmit={() => this.update()}
				/>
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
}
