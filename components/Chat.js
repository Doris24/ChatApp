import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';

//Gifted Chat
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Start extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			massages: [],
		};
	}

	//called when user navigates to chatscreen
	componentDidMount() {

		// get name from StartScreen
		let name = this.props.route.params.name;
		// set name as title of the chat
		this.props.navigation.setOptions({ title: name });

		this.setState({
			messages: [
				{
					_id: 1,
					text: 'Hello ' + name,
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140/any',
					},
				},
				// System message
				{
					_id: 2,
					text: name + ' has entered the chat',
					createdAt: new Date(),
					system: true,
				},
			],
		})
	}

	// called when a user sends a message
	// the message a user has just sent gets appended to the 
	// state messages so that it can be displayed in the chat
	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
	}

	// change Color of the right speech bubbles
	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#D4B1A4'
					}
				}}
			/>
		)
	}

	render() {

		// get bgColor from StartScreen
		let bgColor = this.props.route.params.bgColor;

		return (
			<View style={{
				flex: 1,
				backgroundColor: bgColor,
			}}>
				{/* renders the chat interface */}
				<GiftedChat
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1,
					}}
				/>
				{/* if OS is Android, then wrap 'view' in 'KeyboardAvoidingView', else do nothing */}
				{Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
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