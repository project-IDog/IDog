import { StyleSheet, Dimensions } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const windowHeight = Dimensions.get("window").height;
const topValue = -windowHeight;

const SideMenuLayout = StyleSheet.create({
	ripContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: responsiveWidth(100),
		height: responsiveHeight(100),
		backgroundColor: "#f2f2f2",
	},
	ripview1: {
		top: 0,
		zIndex: 1,
		display: "flex",
		backgroundColor: "red",
		// width: responsiveWidth(100),
		// height: responsiveHeight(100),
	},
	riptext1: {
		color: "#EE8A72",
		fontSize: 24,
		fontWeight: "900",
		marginTop: 40,
	},
	riptext2: {
		color: "#EE8A72",
		fontSize: 24,
		fontWeight: "900",
		marginTop: 10,
	},
	ripImage: {
		zIndex: 10,
		// width: 500,
		height: 400,
		// top:0,
		top: -topValue,

		// borderRadius: 2,
		overflow: "hidden",
	},

	gradient: {
		zIndex: -1,
		height: 600,
		width: 500,
		position: "absolute",
		top: 150,
		display: "flex",
		flexDirection: "column",
		// justifyContent: "center",
		alignItems: "center",
		// paddingHorizontal: responsiveWidth(4),
		// paddingVertical: responsiveHeight(4),
	},
	view2: {
		marginTop: 10,
		width: 350,
		height: 200,
		backgroundColor: "#f2f2f2",
		zIndex: 2,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SideMenuLayout;
