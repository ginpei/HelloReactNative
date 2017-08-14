import React from 'react';
import { Button, Text, View } from 'react-native';

import TitledTextInput from '../../views/TitledTextInput/index.js';

export default class NoteForm extends React.Component {
	render() {
		return (
			<View style={this.props.style}>
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
			</View>
		);
	}
}
