import React, { Component } from 'react';
import {
	Button,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';

export default class TextArea extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: this.props.value,
		};
	}

	render() {
		const textInputStyle = [styles.textInput];
		if (Platform.OS === 'ios') {
			textInputStyle.push(styles.textInputIOS);
		}

		return (
			<View style={[styles.container, this.props.style]}>
				<Text>{this.props.label}</Text>
				<TextInput
					style={textInputStyle}
					value={this.state.value}
					{...this.getInputProps(this.props)}
					/>
			</View>
		);
	}

	getInputProps(allProps) {
		const notInputPropKeys = ['wrapperStyle', 'label'];
		const propKeys = Object.keys(allProps).filter(key => !notInputPropKeys.includes(key));
		const inputProps = propKeys.reduce((props, key) => (props[key] = allProps[key], props), {});
		return inputProps;
	}
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	textInput: {
	},
	textInputIOS: {
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
