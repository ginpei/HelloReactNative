import React from 'react';

import BasicScreen from '../../views/BasicScreen/Index.js';
import NoteForm from '../../views/NoteForm/Index.js';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';
import ShortMessage from '../../views/ShortMessage/Index.js';
import Note from '../../models/Note.js';
import firebase from '../../config/firebase.js';

export default class NoteNew extends React.Component {
	get navParams() {
		return this.props.navigation.state.params;
	}

	constructor(props) {
		super(props);
		this.state = {
			description: '',
			loading: false,
			title: '',
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
					isNew={true}
					title={this.state.title}
					onChange={updates => this.setState(updates)}
					onSubmit={() => this.create()}
					/>
			</BasicScreen>
		);
	}

	create() {
		this.setState({ loading: true });

		const { title, description } = this.state;
		const note = new Note({
			description,
			title,
			userId: firebase.user.uid,
		});
		note.save()
			.then(_ => {
				ShortMessage.show('Created a new note.');
				this.props.navigation.goBack();
			})
			.catch(error => {
				this.setState({ loading: false });
				ShortMessage.show(`Failed to create a note: ${error && error.message}`);
			});
	}
}
