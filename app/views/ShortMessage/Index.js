import React from 'react';
import { Platform, AlertIOS, ToastAndroid } from 'react-native';

export default class ShortMessage {
	static show(message, options = {}) {
		console.log('# ShortMessage::show', message, options);

		if (Platform.OS === 'ios') {
			AlertIOS.alert('', message);
		}
		else {
			const duration = options.duration || ToastAndroid.SHORT;
			ToastAndroid.show(message, duration);
		}
	}
}
