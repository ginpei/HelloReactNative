import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../screens/home/Index.js';
import Second from '../screens/second/Index.js';
import SignIn from '../screens/SignIn/Index.js';

export default StackNavigator({
	SignIn: {
		screen: SignIn,
		navigationOptions: {
			header: null,
		},
	},

	Home: {
		screen: Home,
		navigationOptions: {
			title: 'HelloReactNative',
		},
	},
	Second: {
		screen: Second,
	},
}, {
	initialRouteName: "SignIn",
});
