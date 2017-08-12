import React from 'react';
import ReactNative, {
	FlatList,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';

import Note from '../../models/Note.js';
import CenteredMessage from '../../views/CenteredMessage/Index.js';

export default class Home extends React.Component {
	render() {
		if (this.props.notes.length < 1) {
			return <CenteredMessage message="No notes. 🍣" />;
		}

		return (
			<FlatList
				data={this.props.notes}
				style={styles.list}
				renderItem={(props) => this.renderListItem(props)} />
		);
	}

	renderListItem(info) {
		const note = info.item;
		return (
			<TouchableHighlight
				title={note.title}
				style={styles.note}
				onPress={() => this.props.onItemPress({ note })}>

				<Text>{note.title}</Text>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: '#fff',
	},
	note: {
		padding: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
