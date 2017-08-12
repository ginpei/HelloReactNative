import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import TitledTextInput from '../../views/TitledTextInput/Index.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
		};
	}

	render() {
		const message = this.state.message;
		return (
			<View style={styles.container}>
				<TitledTextInput
					label="Title"
					value={this.state.title}
					onChangeText={title => this.setState({ title })}
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 16,
	},
});
