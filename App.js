import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//navigate between screens
import Start from './components/Start';
import Chat from './components/Chat';
import CustomActions from './components/CustomActions';

//react-navigator
// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {

	constructor(props) {
		super();
	}


	render() {
		return (
			// Navigate between StartScreen and ChatScreen
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Start'>
					<Stack.Screen
						name='Start'
						component={Start} />
					<Stack.Screen
						name='Chat'
						component={Chat} />
				</Stack.Navigator>
			</NavigationContainer>

		);
	}
}

//StyleSheets
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
