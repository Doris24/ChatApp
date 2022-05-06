import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

//import firebase
import firebase from 'firebase';
import firestore from 'firebase';

// to ask Permission
import * as Permissions from 'expo-permissions';
//select a photo
import * as ImagePicker from 'expo-image-picker';

import * as Location from 'expo-location';

export default class CustomActions extends React.Component {

	pickImage = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		try {
			if (status === 'granted') {
				let result = await ImagePicker.launchImageLibraryAsync({
					// mediaTypes: 'Images',
					mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images are allowed
				}).catch(error => console.log(error));

				if (!result.cancelled) {
					const imageUrl = await this.uploadImageFetch(result.uri);
					this.props.onSend({ image: imageUrl });
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};


	takePhoto = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

		try {
			if (status === 'granted') {
				let result = await ImagePicker.launchCameraAsync({
					// mediaTypes: 'Images',
					mediaTypes: ImagePicker.MediaTypeOptions.All,
				}).catch(error => console.log(error));

				if (!result.cancelled) {
					const imageUrl = await this.uploadImageFetch(result.uri);
					this.props.onSend({ image: imageUrl });
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	getLocation = async () => {

		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		try {
			if (status === 'granted') {
				let result = await Location.getCurrentPositionAsync({}).catch(
					(error) => {
						console.error(error);
					}
				);

				if (result) {
					this.props.onSend({
						location: {
							longitude: result.coords.longitude,
							latitude: result.coords.latitude,
						},
					});
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	//upload images to Firebase
	uploadImageFetch = async (uri) => {

		try {
			const response = await fetch(uri);
			const blob = await response.blob();

			const imageNameBefore = uri.split('/');
			const imageName = imageNameBefore[imageNameBefore.length - 1];

			const ref = firebase.storage().ref().child(`Images/${imageName}`);

			const snapshot = await ref.put(blob);

			return await snapshot.ref.getDownloadURL();
		} catch (err) {
			console.log(err.message);
		}

		// const blob = await new Promise((resolve, reject) => {
		// 	const xhr = new XMLHttpRequest();
		// 	xhr.onload = function () {
		// 		resolve(xhr.response);
		// 	};
		// 	xhr.onerror = function (e) {
		// 		console.log(e);
		// 		reject(new TypeError('Network request failed'));
		// 	};
		// 	xhr.responseType = 'blob';
		// 	xhr.open('GET', uri, true);
		// 	xhr.send(null);
		// });

		// const imageNameBefore = uri.split('/');
		// const imageName = imageNameBefore[imageNameBefore.length - 1];

		// const ref = firebase.storage().ref().child(`images/${imageName}`);
		// const snapshot = await ref.put(blob);

		// blob.close();

		// return await snapshot.ref.getDownloadURL();

	}

	onActionPress = () => {
		const options = [
			'Choose From Library',
			'Take Picture',
			'Send Location',
			'Cancel'];
		const cancelButtonIndex = options.length - 1;
		this.context.actionSheet().showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			async (buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						console.log('user wants to pick an image');
						return this.pickImage();
					case 1:
						console.log('user wants to take a photo');
						return this.takePhoto();
					case 2:
						console.log('user wants to get their location');
						return this.getLocation();
				}
			},
		);
	};



	render() {
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={this.onActionPress}
			>
				<View style={[styles.wrapper, this.props.wrapperStyle]}>
					<Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: '#b2b2b2',
		borderWidth: 2,
		flex: 1,
	},
	iconText: {
		color: '#b2b2b2',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
});

// PropTypes: define what the props you sent to a component should look like
// here: define ActionSheet as a function -> error when using wrong prop
CustomActions.contextTypes = {
	actionSheet: PropTypes.func,
};