import React from 'react';
import ReactNative, {
	FlatList,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: [
				{
					key: 'note-001',
					title: 'Alice',
				},
				{
					key: 'note-002',
					title: 'Bob',
				},
				{
					key: 'note-003',
					title: 'Charlie',
				},
			],
		};
	}

	render() {
		return (
			<FlatList
				data={this.state.notes}
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
	},
	item: {
		padding: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
