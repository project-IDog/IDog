import React, { useState } from "react";
import { View, TextInput, StyleSheet, NativeModules } from "react-native";
import SharedGroupPreferences from "react-native-shared-group-preferences";
const group = "group.asap";
const SharedStorage = NativeModules.SharedStorage;
const WidgetTest = () => {
	const [text, setText] = useState("");
	const widgetData = { text };
	const handleSubmit = async () => {
		try {
			// iOS
			await SharedGroupPreferences.setItem("widgetKey", widgetData, group);
		} catch (error) {
			console.log({ error });
		}
		// Android
		SharedStorage.set(JSON.stringify({ text }));
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={(newText) => setText(newText)}
				value={text}
				returnKeyType="send"
				onEndEditing={handleSubmit}
				placeholder="Enter the text to display on the Widget"
			/>
		</View>
	);
};
export default WidgetTest;
const styles = StyleSheet.create({
	container: {
		marginTop: "50%",
		paddingHorizontal: 24,
	},
	input: {
		width: "100%",
		borderBottomWidth: 1,
		fontSize: 20,
		minHeight: 40,
	},
});
