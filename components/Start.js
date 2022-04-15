import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Pressable } from 'react-native';

// BackgraundImage for StartScreen
import BackgroundImage from '../assets/background-image.png';

export default class Start extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			bgColor: this.colors.color1,
		};
	}
	// managed the chosen backgraundColor for the Chat Screen
	changeBgColor = (newColor) => {
		this.setState({ bgColor: newColor });
	}
	// available colors to choose from for the Chat Screen background
	colors = {
		color1: '#090C08', //black
		color2: '#474056', //darkgray
		color3: '#8A95A5', //gray
		color4: '#B9C6AE'  //lightgreen
	};

	render() {
		return (
			<View style={styles.container}>

				<ImageBackground
					source={BackgroundImage}
					resizeMode='cover'
					style={styles.backgroundImage}>

					{/* Box1 */}
					<View style={styles.titleBox}>
						<Text style={styles.title}>ChatApp</Text>
					</View>

					{/* Box2 */}
					<View style={styles.box}>
						{/* choose name */}
						<View style={styles.textInputBox}>
							<TextInput
								style={styles.textInput}
								onChangeText={(name) => this.setState({ name })}
								value={this.state.name}
								placeholder='Your Name'
							/>
						</View>

						<View style={styles.textBox}>
							<Text style={styles.changeColor}>Choose Background Color:</Text>
						</View>
						{/* choose backgroundColor for ChatScreen */}
						<View style={styles.changeColorBox}>
							<TouchableOpacity
								style={styles.color1}
								onPress={() => this.changeBgColor(this.colors.color1)}
							>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.color2}
								onPress={() => this.changeBgColor(this.colors.color2)}
							>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.color3}
								onPress={() => this.changeBgColor(this.colors.color3)}
							>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.color4}
								onPress={() => this.changeBgColor(this.colors.color4)}
							>
							</TouchableOpacity>
						</View>

						{/* button to navigate to ChatScreen */}
						<View style={styles.startButtonBox}>
							<Pressable
								style={styles.startButton}
								onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })}>
								<Text style={styles.startButtonText}>Start Chatting</Text>
							</Pressable>
						</View>

					</View>
				</ImageBackground>
			</View>
		)
	}
}

const styles = StyleSheet.create({

	container: {
		flex: 1,

	},

	backgroundImage: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-evenly',

	},
	// Box for title
	titleBox: {
		height: '50%',
		width: '88%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: '#FFF',
		fontSize: 45,
		fontWeight: '600',
	},

	// Box for inputs
	box: {
		backgroundColor: '#FFF',
		height: '44%',
		width: '88%',
		padding: '5%',
		justifyContent: "space-around",
	},
	textInput: {
		backgroundColor: 'white',
		borderWidth: 1,
		fontSize: 16,
		height: 50,
		fontWeight: '300',
		color: '#757083',
		// opacity: 0.5,
		padding: '3%'
	},

	changeColor: {
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		opacity: 1,
		marginTop: '5%',
	},

	changeColorBox: {
		flexDirection: 'row',
		width: '100%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'space-evenly'

	},
	color1: {
		backgroundColor: '#090C08',
		height: 70,
		width: 70,
		borderRadius: 35
	},
	color2: {
		backgroundColor: '#474056',
		height: 70,
		width: 70,
		borderRadius: 35
	},
	color3: {
		backgroundColor: '#8A95A5',
		height: 70,
		width: 70,
		borderRadius: 35
	},
	color4: {
		backgroundColor: '#B9C6AE',
		height: 70,
		width: 70,
		borderRadius: 35
	},

	startButton: {
		backgroundColor: '#757083',
		height: 50,
		padding: '4%'
	},
	startButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFF',
		textAlign: 'center'
	}


})