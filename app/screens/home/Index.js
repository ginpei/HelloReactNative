import React, { Component } from 'react';
import {
	Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
				<Button onPress={() => this.onclick()} title="Next"></Button>
      </View>
    );
  }

	onclick() {
		const { navigate } = this.props.navigation;
		navigate('Second');
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
