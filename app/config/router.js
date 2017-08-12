import React from 'react';
import { Button } from 'react-native';
import { DrawerNavigator, TabNavigator, StackNavigator } from 'react-navigation';

import Account from '../screens/Account/Index.js';
import Home from '../screens/Home/Index.js';
import Second from '../screens/second/Index.js';
import SignIn from '../screens/SignIn/Index.js';
import NoteNew from '../screens/NoteNew/Index.js';

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

	Second: {
		screen: Second,
	},
}, {
	initialRouteName: "SignIn",
});
