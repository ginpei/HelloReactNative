import React from 'react';
import { Button } from 'react-native';
import { DrawerNavigator, TabNavigator, StackNavigator } from 'react-navigation';

import Account from '../screens/Account/index.js';
import Home from '../screens/Home/index.js';
import SignIn from '../screens/SignIn/index.js';
import NoteNew from '../screens/NoteNew/index.js';
import NoteEdit from '../screens/NoteEdit/index.js';
import NoteView from '../screens/NoteView/index.js';

function DrawerButton(props) {
	return (
		<Button
			title="≡"
			onPress={() => props.navigation.navigate('DrawerOpen')}
			/>
	);
}

export default StackNavigator({
	SignIn: {
		screen: SignIn,
		navigationOptions: {
			header: null,
		},
	},

	Top: {
		screen: DrawerNavigator({
			Home: {
				screen: Home,
				navigationOptions(props) {
					return {
						title: 'Home',
						headerLeft: <DrawerButton {...props} />,
						headerRight: (
							<Button
								title="Add"
								onPress={() => props.navigation.navigate('NoteNew')}
								/>
						),
					};
				},
			},
			Account: {
				screen: Account,
				navigationOptions(props) {
					return {
						title: 'Account',
						headerLeft: <DrawerButton {...props} />,
					};
				},
			},
		}),
	},

	NoteNew: {
		screen: NoteNew,
		navigationOptions: {
			title: 'New Note',
		},
	},

	NoteEdit: {
		screen: NoteEdit,
		navigationOptions: {
			title: 'Edit Note',
		},
	},

	NoteView: {
		screen: NoteView,
		// navigationOptions: {
		// 	title: 'Note',
		// },
	},
}, {
	initialRouteName: "SignIn",
});
