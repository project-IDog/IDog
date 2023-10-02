import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import PlayIcon from "../../assets/images/play-icon.png";

import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const SubMain = ({ subTitle, mainTitle, bgImg, desc }: any) => {
	return (
		<>
			<View style={styles.subMainWrap}>
				<ImageBackground source={bgImg} style={styles.subMainBg}>
					<View style={styles.subMainInfoWrap}>
						<Text style={styles.subMainSubTitle}>{subTitle}</Text>
						<Text style={styles.subMainMainTitle}>{mainTitle}</Text>
						<View style={styles.subMainDescWrap}>
							<Text style={styles.subMainDesc}>{desc}</Text>
							<Image source={PlayIcon} />
						</View>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	subMainWrap: {
		position: "relative",
		top: -80,
		zIndex: -1,
	},
	subMainBg: {
		width: responsiveWidth(100),
		height: responsiveHeight(60),
		resizeMode: "cover",
		position: "relative",
		paddingHorizontal: responsiveWidth(4),
	},
	subMainInfoWrap: {
		marginTop: "auto",
	},
	subMainSubTitle: {
		fontSize: 18,
		fontWeight: "400",
		color: "#FFF",
	},
	subMainMainTitle: {
		fontSize: 26,
		fontWeight: "400",
		color: "#FFF",
		marginTop: 2,
	},
	subMainDescWrap: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: responsiveHeight(6),
		marginTop: 12,
	},
	subMainDesc: {
		fontSize: 18,
		fontWeight: "400",
		color: "#FFF",
		marginRight: responsiveWidth(2),
	},
});

export default SubMain;
