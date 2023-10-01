import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const WalkLayout = StyleSheet.create({
	calendarTitleWrap: {
		paddingHorizontal: responsiveWidth(4),
	},
	statistics: {
		marginTop: -80,
	},
	calendarDesc: {
		fontSize: 12,
		fontWeight: "400",
		color: "#C8C9CE",
	},
	calendarTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#535458",
		marginTop: 3,
	},
	boldCalendarTitle: {
		color: "#EE8A72",
	},
	calendarWrap: {
		marginHorizontal: responsiveWidth(4),
		borderTopWidth: 1,
		borderTopColor: "#C4C4C4",
		borderBottomWidth: 1,
		borderBottomColor: "#C4C4C4",
		marginTop: 20,
	},
	daysWrap: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 17,
	},
	dayText: {
		width: responsiveWidth(13),
		textAlign: "center",
		fontSize: 11,
		fontWeight: "600",
		color: "#4C4C4C",
	},
	centerDayText: {
		backgroundColor: "#EE8A72",
		borderRadius: 50,
		color: "#FFF",
	},
	datesWrap: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
		marginBottom: 18,
	},
	dateText: {
		width: responsiveWidth(13),
		textAlign: "center",
		fontSize: 11,
		fontWeight: "600",
		color: "#4C4C4C",
	},
	centerDateText: {},
	redDayText: {
		color: "#CB6E8D",
	},

	choiceWrap: {
		paddingHorizontal: responsiveWidth(4),
		marginTop: 40,
	},
	titleFlexWrap: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	nameTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#545454",
	},
	mainTitle: {
		fontSize: 12,
		fontWeight: "500",
		color: "#545454",
		marginTop: 4,
	},
	tabWrap: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	tabText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#C8C9CE",
	},
	tabImage: {
		width: 10,
		height: 10,
		marginLeft: 4,
	},

	timerWrap: {
		marginTop: 38,
		paddingBottom: 32,
		backgroundColor: "#F7F8FC",
	},
	timerTitleWrap: {
		width: responsiveWidth(92),
		paddingHorizontal: responsiveWidth(4),
		paddingTop: 33,
	},
	timerMainTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#3B3F42",
		textAlign: "center",
	},
	timerSubTitle: {
		fontSize: 10,
		fontWeight: "400",
		color: "#535458",
		marginTop: 6,
		textAlign: "center",
	},

	contentFlexWrap: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(4),
		marginTop: 18,
	},
	contentWrap: {
		width: responsiveWidth(45),
		paddingHorizontal: responsiveWidth(1),
		borderRadius: 15,
		height: 214,
		backgroundColor: "#FFF",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},

	todayTimerTitle: {
		fontSize: 12,
		fontWeight: "700",
		color: "#8F8F8F",
	},
	timer: {
		paddingVertical: 21,
	},
	timerImg: {
		width: 100,
		height: 100,
	},
	timerText: {
		position: "relative",
		top: "-50%",
		fontSize: 16,
		fontWeight: "700",
		color: "#909090",
		textAlign: "center",
	},
	todayTimerButtonWrap: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: -28,
	},
	startButton: {
		width: 76,
		height: 30,
		backgroundColor: "#EE8A72",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	startButtonText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#FAFAFA",
	},
	stopButton: {
		width: 76,
		height: 30,
		backgroundColor: "#EE8A72",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	stopButtonText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#FAFAFA",
	},
	finishButton: {
		width: 76,
		height: 30,
		backgroundColor: "#EFEFEF",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		marginLeft: 4,
	},
	finishButtonText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#EE8A72",
	},
	listWrap: {
		width: responsiveWidth(45),
		paddingHorizontal: responsiveWidth(1),
		borderRadius: 15,
		backgroundColor: "#FFF",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: responsiveHeight(4),
	},
	weekListTitle: {
		fontSize: 12,
		fontWeight: "700",
		color: "#8F8F8F",
		marginBottom: 7,
	},
	totalTimeText: {
		fontSize: 10,
		fontWeight: "500",
		color: "#8F8F8F",
		marginTop: 12,
	},
	boldTotalTimeText: {
		fontWeight: "700",
	},
});

export default WalkLayout;
