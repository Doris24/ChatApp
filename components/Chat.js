import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Start extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		// get name from StartScreen
		let name = this.props.route.params.name;
		// set name as title of the chat
		this.props.navigation.setOptions({ title: name });

		// get bgColor from StartScreen
		let bgColor = this.props.route.params.bgColor;

		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: bgColor
			}}>
				{/* show name */}
				<Text style={styles.text}>Hello {name}</Text>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	text: {
		fontSize: 25,
		color: 'darkblue'
	},

})