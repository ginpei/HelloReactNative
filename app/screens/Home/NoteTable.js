import React from 'react';
import ReactNative, {
	FlatList,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';

import firebase from '../../config/firebase.js';
import Note from '../../models/Note.js';
import LoadingIndicator from '../../views/LoadingIndicator/Index.js';
import CenteredMessage from '../../views/CenteredMessage/Index.js';
import ShortMessage from '../../views/ShortMessage/Index.js';

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
			.catch(error => {
				ShortMessage.show(`Failed to fetch notes: ${error && error.message}`);
			});
	}

	render() {
		if (this.state.loading) {
			return <LoadingIndicator />;
		}
		else if (this.state.notes.length < 1) {
			return <CenteredMessage message="No notes. 🍣" />;
		}

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
		backgroundColor: '#fff',
	},
	item: {
		padding: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
