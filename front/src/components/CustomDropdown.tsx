import React from "react";
import {
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	View,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const CustomDropdown = ({ data, onSelect }) => {
	return (
		<View style={styles.container}>
			<ScrollView style={styles.dropdown}>
				{data.map((item, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							console.log("hello");
							onSelect(item.breedName);
						}}
					>
						<Text style={styles.dropdownItem}>{item.breedName}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		position: "absolute",
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: responsiveWidth(4),
		top: responsiveHeight(10),
		width: responsiveWidth(100),
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		paddingLeft: 10,
		marginBottom: 10,
	},
	dropdown: {
		maxHeight: 120, // Adjust the max height
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 20,
		backgroundColor: "#fff",
	},
	dropdownItem: {
		padding: 10,
		borderBottomColor: "#eee",
		borderBottomWidth: 1,
	},
	selectedItem: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default CustomDropdown;
