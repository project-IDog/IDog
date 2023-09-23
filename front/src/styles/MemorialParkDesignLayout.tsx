import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const MemorialParkDesignLayout = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	view1: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	bg1: {
		zIndex: -1,
		// backgroundColor: "#EE8A72",
		resizeMode: "cover",
	},
	cloud1: {
		zIndex: -2,
		position: "absolute",
		resizeMode: "cover",
		top: responsiveHeight(55),
	},
	cloud2: {
		position: "absolute",
		resizeMode: "cover",
		top: responsiveHeight(50),
		left: responsiveWidth(0),
	},
	grass1: {
		position: "absolute",
		top: responsiveHeight(50),
		right: responsiveWidth(43),
		transform: [{ scale: 1 }],
	},
	grass2: {
		position: "absolute",
		top: responsiveHeight(48),
		right: responsiveWidth(35),
		transform: [{ scale: 0.8 }],
	},
	grass3: {
		position: "absolute",
		top: responsiveHeight(50),
		left: responsiveWidth(36),
		transform: [{ scale: 1 }],
	},
	grass4: {
		position: "absolute",
		top: responsiveHeight(47),
		left: responsiveWidth(44),
		transform: [{ scale: 0.9 }],
	},
	grass5: {
		position: "absolute",
		top: responsiveHeight(48),
		left: responsiveWidth(30),
		transform: [{ scale: 0.9 }],
	},
	grass6: {
		position: "absolute",
		top: responsiveHeight(49),
		right: responsiveWidth(25),
		transform: [{ scale: 1 }],
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 49,
		fontWeight: "bold",
		backgroundColor: "red",
	},
	item: {
		padding: 10,
		fontSize: 20,
		height: 44,
	},
	nftcontainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: responsiveHeight(10),
		
	},
	nftview: {
		height: responsiveHeight(50),
		width: responsiveWidth(70),
		alignItems: "center",
		justifyContent: "center",
	},
	nftbg: {
		height: responsiveHeight(50),
		// width: responsiveWidth(70),
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MemorialParkDesignLayout;
