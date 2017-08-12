import React from 'react';
import { Button, Text, View } from 'react-native';

import BasicScreen from '../../views/BasicScreen/Index.js';
import TitledTextInput from '../../views/TitledTextInput/Index.js';

export default class NoteForm extends React.Component {
	render() {
		return (
			<BasicScreen>
				<TitledTextInput
					label="Title"
					value={this.props.title}
					onChangeText={title => this.props.onChange({ title })}
					/>
				<TitledTextInput
					label="Description (Optional)"
					value={this.props.description}
					onChangeText={description => this.props.onChange({ description })}
					/>
				<Button
					title={this.props.isNew ? 'Create' : 'Update'}
					onPress={() => this.props.onSubmit()}
					/>
			</BasicScreen>
		);
	}
}
