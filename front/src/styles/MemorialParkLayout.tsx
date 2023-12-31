import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const AdoptionLayout = StyleSheet.create({
	Mpbackground: {
		backgroundColor: "#F2F2F2",
		width: responsiveWidth(100),
		height: responsiveHeight(100),
		zIndex: 10,
		position: "absolute",
	},
	MpTitleWrap: {
		marginTop: -44,
		paddingHorizontal: responsiveWidth(4),
	},
	MpDesc: {
		fontSize: 12,
		fontWeight: "400",
		color: "#C8C9CE",
	},
	MpTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#535458",
		marginTop: 3,
	},

	mpTitlewrap: {
		marginHorizontal: responsiveWidth(4),
		marginVertical: responsiveHeight(4),
		backgroundColor: "rgba(187,166,166, 0.5)",
		borderRadius: 15,
	},
	mpTitlewrap2: {
		marginHorizontal: responsiveWidth(4),
		// marginVertical: responsiveHeight(4),
		borderRadius: 25,
	},
	mpTitlewrap3: {
		marginHorizontal: responsiveWidth(4),
		marginVertical: responsiveHeight(4),
		backgroundColor: "rgba(187,166,166, 0.5)",
		borderRadius: 15,
	},
	mpTitlewrap4: {
		marginHorizontal: responsiveWidth(4),
		marginVertical: responsiveHeight(4),
		backgroundColor: "rgba(187,166,166, 0.5)",
		borderRadius: 15,
		// width: responsiveWidth(40),
	},
	mpTitle: {
		paddingHorizontal: responsiveWidth(3),
		marginTop: 5,
		fontSize: 18,
		fontWeight: "900",
	},
	mpBreed: {
		paddingHorizontal: responsiveWidth(3),
		marginTop: 5,
		fontSize: 14,
		fontWeight: "600",
	},
	mpDate: {
		marginHorizontal: responsiveWidth(4),
		marginTop: 5,
		fontSize: 14,
		fontWeight: "900",
	},

	mpMarginwrap: {
		marginHorizontal: responsiveWidth(4),
		marginVertical: responsiveHeight(2),
		// backgroundColor: "blue",
		display: "flex",
		justifyContent: "center",
	},
	mpBtw: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	mpBtw2: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(3),
	},
	mpCol: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	tabImage: {
		width: responsiveWidth(30),
		height: responsiveHeight(20),
		paddingHorizontal: responsiveWidth(1),
		borderRadius: 25,
	},
	tabImage2: {
		width: responsiveWidth(12),
		height: responsiveHeight(9),
		borderRadius: 10,
	},
	tabImage3: {
		width: responsiveWidth(27),
		height: responsiveHeight(17),
		borderRadius: 7,
		display: "flex",
		marginTop: responsiveHeight(1),
	},

	mpComent: {
		marginHorizontal: responsiveWidth(3),
		fontSize: 16,
		fontWeight: "500",
		display: "flex",
		width: responsiveWidth(78),
	},
	mpComentDate: {
		marginHorizontal: responsiveWidth(3),
		fontSize: 12,
		fontWeight: "500",
		color: "white",
		display: "flex",
	},
	mpComentWarp: {
		flexDirection: "column",
		display: "flex",
		marginBottom: 15,
	},
	mpcommentbutton: {
		// display: "flex",
		// flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	mpAlbumTitle: {
		paddingHorizontal: responsiveWidth(3),
		marginTop: 5,
		fontSize: 18,
		fontWeight: "900",
	},
	mpAlbumwarp: {
		flexDirection: "row",
		justifyContent: "space-between",
		display: "flex",
		marginBottom: 15,
		flexWrap: "wrap",
	},
	commentcontainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(1),
		// backgroundColor: "#F2F2F2",
	},
	commentInput: {
		paddingHorizontal: responsiveWidth(3),
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 10,
		backgroundColor: "white",
		width: responsiveWidth(68),
		fontSize: 15,
	},
	commentsubmit: {
		backgroundColor: "#2196F3",
		color: "white",
		fontSize: 18,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(2.5),
		borderRadius: 10,
	},

	commentsubmittext: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	mpAlbumcontainer: {
		paddingHorizontal: responsiveWidth(4),
		paddingBottom: responsiveHeight(3),
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	mpAlbumText: {
		paddingHorizontal: responsiveWidth(4),
		paddingTop: responsiveHeight(2),
	},
	mpAlbumplusbtn: {
		marginHorizontal: responsiveWidth(3),
		fontSize: 16,
		fontWeight: "500",
		display: "flex",
		width: responsiveWidth(78),
		paddingBottom: responsiveHeight(2),
	},
});

export default AdoptionLayout;
