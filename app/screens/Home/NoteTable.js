import React from 'react';
import ReactNative, {
	FlatList,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';

import firebase from '../../config/firebase.js';
import Note from '../../models/Note.js';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: true,
			notes: [],
		};
	}

	componentWillMount() {
		const user = firebase.user;
		Note.fetchAllFor(user)
			.then(notes => this.setState({ loading: false, notes: notes }))
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
