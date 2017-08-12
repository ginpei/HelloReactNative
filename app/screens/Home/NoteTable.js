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

	renderListItem({item}) {
		return (
			<TouchableHighlight
				title={item.title}
				style={styles.item}
				onPress={() => this.props.onItemPress({item})}>

				<Text>{item.title}</Text>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: '#fff',
	},
	item: {
		padding: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
