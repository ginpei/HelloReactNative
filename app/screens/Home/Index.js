import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import NoteTable from './NoteTable.js'

export default class Home extends Component {
	render() {
		return (
			<NoteTable
				onItemPress={(props) => this.onItemPress(props)} />
		);
	}

	onItemPress({item}) {
		const { navigate } = this.props.navigation;
		navigate('Second', {item});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
