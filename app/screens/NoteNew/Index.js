import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import TitledTextInput from '../../views/TitledTextInput/Index.js';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';
import ShortMessage from '../../views/ShortMessage/Index.js';
import Note from '../../models/Note.js';

export default class Home extends React.Component {
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
			<View style={styles.container}>
				<TitledTextInput
					label="Title"
					value={this.state.title}
					onChangeText={title => this.setState({ title })}
					/>
				<TitledTextInput
					label="Description (Optional)"
					value={this.state.description}
					onChangeText={title => this.setState({ title })}
					/>
				<Button
					title="Create"
					onPress={() => this.create()}
					/>
			</View>
		);
	}

	create() {
		this.setState({ loading: true });

		const { title, description } = this.state;
		const note = new Note({ title, description });
		note.save()
			.then(_ => {
			})
			.catch(error => {
				this.setState({ loading: false });
				ShortMessage.show(`Failed to create a note: ${error && error.message}`);
			});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 16,
	},
});
