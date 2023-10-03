import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const CreateProfileLayout = StyleSheet.create({
	createProfileTitleWrap: {
		paddingHorizontal: responsiveWidth(4),
		marginTop: 2,
	},
	createProfileDesc: {
		fontSize: 12,
		fontWeight: "400",
		color: "#C8C9CE",
	},
	createProfileTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#535458",
		marginTop: 3,
	},
	imageUploadWrap: {
		width: responsiveWidth(92),
		height: 132,
		borderWidth: 2,
		borderColor: "#E1E1E1",
		borderRadius: 10,
		marginLeft: responsiveWidth(4),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},
	selectedImage: {
		width: 100,
		height: 132,
		marginHorizontal: responsiveWidth(4),
		marginTop: 12,
		borderRadius: 6,
	},
	formWrap: {
		paddingHorizontal: responsiveWidth(4),
	},
	formTitle: {
		fontSize: 12,
		fontWeight: "500",
		color: "#B6B6B6",
		marginTop: 12,
	},
	formInput: {
		width: responsiveWidth(92),
		height: 36,
		borderWidth: 1,
		borderColor: "#9D9D9D",
		borderRadius: 2,
		marginTop: 7,
		padding: 6,
	},
	formpicker: {
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#9D9D9D",
		borderRadius: 2,
		marginTop: 7,
		width: responsiveWidth(92),
	},

	dateFormWrap: {
		width: responsiveWidth(92),
		height: 36,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: "#9D9D9D",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(2),
		marginTop: 7,
	},
	dateFormText: {
		marginLeft: responsiveWidth(2),
	},

	formButtonWrap: {
		paddingHorizontal: responsiveWidth(4),
		marginTop: 33,
		marginBottom: 22,
	},
	submitButton: {
		width: responsiveWidth(92),
		height: 50,
		backgroundColor: "#EE8A72",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	submitButtonText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#FFFFFF",
	},
	cancelButton: {
		width: responsiveWidth(92),
		height: 50,
		backgroundColor: "#E9ECF5",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 6,
	},

	cancelButtonText: {
		fontSize: 16,
		fontWeight: "400",
		color: "#21242B",
	},
});

export default CreateProfileLayout;
