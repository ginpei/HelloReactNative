import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import NoteTable from './NoteTable.js'
import { DrawerNavigator } from 'react-navigation';

class Home extends Component {
	render() {
		return (
			<NoteTable
				onItemPress={(props) => this.onItemPress(props)} />
		);
	}

	onItemPress({item}) {
		const { navigate } = this.props.navigation;
		navigate('Second', {item});
	}
}

class Next extends Component {
	render() {
		return (
			<View>
				<Text>Next</Text>
			</View>
		);
	}
}

export default DrawerNavigator({
	Main: {
		screen: Home,
		navigationOptions(props) {
			return {
				headerLeft: (
					<Button
						title="≡"
						onPress={() => props.navigation.navigate('DrawerOpen')}
						/>
				),
			};
		},
	},
	Next: {
		screen: Next,
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
