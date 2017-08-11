import React from 'react';
import { ToastAndroid } from 'react-native';

export default class ShortMessage {
	static show(message, options = {}) {
		console.log('# ShortMessage::show', message, options);
		const duration = options.duration || ToastAndroid.SHORT;
		ToastAndroid.show(message, duration);
	}
}
