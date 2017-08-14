import { Alert } from 'react-native';

export function ask(message, okCallback) {
	if (typeof okCallback !== 'function') {
		throw new Error('Callback must be a function.');
	}

	const title = null;
	const buttons = [
		{ text: 'Cancel' },
		{ text: 'OK', onPress: () => okCallback() },
	];
	Alert.alert(title, message, buttons);
}
