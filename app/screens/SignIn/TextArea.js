import React, { Component } from 'react';
import {
	TextInput,
	StyleSheet,
	Text,
	Button,
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
		return (
			<View style={[styles.container, this.props.style]}>
				<Text>{this.props.label}</Text>
				<TextInput
					style={styles.textInput}
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
		width: '100%',
	},
	textInput: {
		width: '100%',
	},
});
