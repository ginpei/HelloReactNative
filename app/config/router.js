import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../screens/home/Index.js';
import Second from '../screens/second/Index.js';

export default StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			title: 'HelloReactNative',
		},
	},
	Second: {
		screen: Second,
	},
});
