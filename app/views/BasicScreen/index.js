import React from 'react';
import { ScrollView, View } from 'react-native';

export default function WrapperView(props) {
	return (
		<ScrollView style={styles.scroll}>
			<View style={styles.inner}>
				{props.children}
			</View>
		</ScrollView>
	);
}

const styles = {
	scroll: {
		backgroundColor: '#fff',
		flex: 1,
	},
	inner: {
		padding: 16,
	},
};
