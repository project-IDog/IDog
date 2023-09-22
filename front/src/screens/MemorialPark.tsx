import {
	TouchableOpacity,
	View,
	Text,
	Image,
	StyleSheet,
	Animated,
} from "react-native";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import IndexStore from "../stores/IndexStore";
import CommonLayout from "../components/CommonLayout";
import MainHeader from "../components/MainHeader";
import BG1 from "../../assets/images/BG1.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
import cloud22 from "../../assets/images/cloud22.png";
import cloud32 from "../../assets/images/cloud32.png";

const Main = ({ navigation }: any) => {
	const grasses = [
		MemorialParkDesignLayout.grass1,
		MemorialParkDesignLayout.grass2,
		MemorialParkDesignLayout.grass3,
		MemorialParkDesignLayout.grass4,
		MemorialParkDesignLayout.grass5,
		MemorialParkDesignLayout.grass6,
	];

	const { LoginStore } = IndexStore();

	const authHandling = (pageName: string) => {
		if (pageName === "Three") {
			navigation.navigate(pageName);
			return;
		}

		if (LoginStore.isLogged) {
			navigation.navigate(pageName);
		} else {
			alert("해당 서비스는 로그인 후 이용가능합니다.");
		}
	};

	const animatedX1 = new Animated.Value(-responsiveWidth(0));
	const animatedX2 = new Animated.Value(-responsiveWidth(50));

	const animatedLoop = (animatedValue: Animated.Value) => {
		Animated.sequence([
			Animated.timing(animatedValue, {
				toValue: responsiveWidth(150),
				duration: 100000,
				useNativeDriver: true,
			}),
			Animated.timing(animatedValue, {
				toValue: responsiveWidth(-200),
				duration: 0,
				useNativeDriver: true,
			}),
		]).start(() => {
			animatedLoop(animatedValue);
		});
	};

	useEffect(() => {
		animatedLoop(animatedX1);
		animatedLoop(animatedX2);
	}, []);

	return (
		<>
			<CommonLayout>
				<MainHeader></MainHeader>
				<View style={MemorialParkDesignLayout.view1}>
					<Image source={BG1} style={MemorialParkDesignLayout.bg1} />
					<Animated.Image
						source={cloud22}
						style={[
							MemorialParkDesignLayout.cloud1,
							{ transform: [{ translateX: animatedX1 }] },
						]}
					/>
					<Animated.Image
						source={cloud32}
						style={[
							MemorialParkDesignLayout.cloud2,
							{ transform: [{ translateX: animatedX2 }] },
						]}
					/>
				</View>
				{grasses.map((grass, index) => {
					return (
						<LottieView
							key={index}
							source={require("../../assets/grass.json")}
							style={[grass]}
							autoPlay
							loop
							speed={0.4}
						/>
					);
				})}
			</CommonLayout>
		</>
	);
};

const MemorialParkDesignLayout = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	view1: {
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
		top: responsiveHeight(50),
		right: responsiveWidth(43),
		transform: [{ scale: 1 }],
	},
	grass2: {
		top: responsiveHeight(52),
		right: responsiveWidth(35),
		transform: [{ scale: 0.8 }],
	},
	grass3: {
		top: responsiveHeight(55),
		left: responsiveWidth(36),
		transform: [{ scale: 1 }],
	},
	grass4: {
		top: responsiveHeight(49),
		left: responsiveWidth(40),
		transform: [{ scale: 0.9 }],
	},
	grass5: {
		top: responsiveHeight(54),
		left: responsiveWidth(30),
		transform: [{ scale: 0.85 }],
	},
	grass6: {
		top: responsiveHeight(55),
		right: responsiveWidth(25),
		transform: [{ scale: 1 }],
	},
});

export default Main;
