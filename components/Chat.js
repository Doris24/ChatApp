import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';

//Gifted Chat
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

//import firebase
const firebase = require('firebase');
require('firebase/firestore');

//AsyncStorage (offlineStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';
//NetInfo to check if user is off or online
import NetInfo from '@react-native-community/netinfo';

export default class Start extends React.Component {

	constructor(props) {
		super();

		this.state = {
			messages: [],
			uid: 0,
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
			isConnected: false,
		};

		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: "AIzaSyB8yTyRo8lNEE1LALUqOST2WVIxx0EbMmg",
			authDomain: "chatapp-bf5d4.firebaseapp.com",
			projectId: "chatapp-bf5d4",
			storageBucket: "chatapp-bf5d4.appspot.com",
			messagingSenderId: "386452457126",
			appId: "1:386452457126:web:9115b95b7e148081e3d667"
		};

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		// reference the database
		this.referenceChatMessages = firebase.firestore().collection('messages');

	}

	async getMessages() {
		let messages = '';
		try {
			messages = (await AsyncStorage.getItem('messages')) || [];
			this.setState({
				messages: JSON.parse(messages)
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	async saveMessages() {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
		} catch (error) {
			console.log(error.message);
		}
	}

	async deleteMessages() {
		try {
			await AsyncStorage.removeItem('messages');
			this.setState({
				messages: []
			})
		} catch (error) {
			console.log(error.message);
		}
	}

	//called when user navigates to chatscreen
	componentDidMount() {

		// get name from StartScreen
		let name = this.props.route.params.name;
		// set name as title of the chat
		this.props.navigation.setOptions({ title: name });

		// this.getMessages();

		NetInfo.fetch().then(connection => {
			console.log('==============connection', connection);
			if (connection.isConnected) {
				this.setState({ isConnected: true });
				console.log('online');
				//listen for changes
				this.unsubscribe = this.referenceChatMessages
					.orderBy("createdAt", "desc")
					.onSnapshot(this.onCollectionUpdate);

				//authorization
				this.authUnsubscribe = firebase
					.auth()
					.onAuthStateChanged(async (user) => {
						// if (!user) {
						// 	return await firebase.auth().signInAnonymously();
						// }
						try {
							let response = await firebase.auth().signInAnonymously();
							user = response.user
							console.log(user);
						} catch (error) {
							console.error(error)
						}
						// }

						this.setState({
							uid: user.uid,
							// messages: [],
							user: {
								_id: user.uid,
								name: name,
								avatar: 'https://placeimg.com/140/140/any',
							},
						});

					});
				//save messages locally
				this.saveMessages();

			} else {
				this.setState({ isConnected: false });
				console.log('offline');
				this.getMessages();
			}
		});
	}

	// retrieve the current data from the collection 
	// with querySnapshot and store it in state messages
	onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// go through each document
		querySnapshot.forEach((doc) => {
			// get the QueryDocumentSnapshot's data
			let data = doc.data();
			messages.push({
				_id: data._id,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: {
					_id: data.user._id,
					name: data.user.name,
					avatar: data.user.avatar,
				},
			});
		});
		this.setState({
			messages: messages,
		});
		this.saveMessages();
	};

	addMessages() {
		const message = this.state.messages[0];

		this.referenceChatMessages.add({
			_id: message._id,
			text: message.text || "",
			createdAt: message.createdAt,
			user: this.state.user,
		});
	}

	// called when a user sends a message
	// the message a user has just sent gets appended to the 
	// state messages so that it can be displayed in the chat
	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}),
			() => {
				this.addMessages();
				this.saveMessages();
			}

		);
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

	// changes the chat bar when offline
	renderInputToolbar(props) {
		if (this.state.isConnected == false) {
		} else {
			return (
				<InputToolbar
					{...props}
				/>
			);
		}
	}

	componentWillUnmount() {
		if (this.state.isConnected) {
			//stop authentication
			this.authUnsubscribe();
			//stop listening to changes
			this.unsubscribe();
		}
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
					renderInputToolbar={this.renderInputToolbar.bind(this)}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: this.state.user._id,
						name: this.state.name,
						avatar: this.state.user.avatar,
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