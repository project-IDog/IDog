import react from "react";
// import Dog2 from "../components/RipDog/Dog2";
import Dog4 from "../components/RipDog/Dog4";
// import Bg from "../components/RipDog/BottomToTop/Bg";
import Bg from "../../assets/images/Rip/bg.png";
import Object1 from "../components/RipDog/LeftToRight/Object1";
import Object2 from "../components/RipDog/LeftToRight/Object2";

import Ground from "../components/RipDog/BottomToTop/Ground";
import Dog5 from "../components/RipDog/Dog5";
import Building from "../components/RipDog/BottomToTop/Building";
import { View, StyleSheet, Image } from "react-native";
import Grass from "../components/RipDog/BottomToTop/Grass";
import Cycle from "../components/RipDog/LeftToRight/CycleMan";
import Running from "../components/RipDog/LeftToRight/Running";
import Cloud from "../components/RipDog/LeftToRight/Cloud";

const Test = () => {
	return (
		<>
			{/* <Dog2 /> */}
			<View style={styles.dog4}>
				<Dog4 />
			</View>
			{/* <Bg /> */}
			<Object1 />
			<Object2 />
			<View style={styles.dog5}>
				<Dog5 />
			</View>
			<Ground />
			{/* <Bush /> */}
			<View style={styles.building}>
				<Building />
			</View>
			<View style={styles.grass}>
				<Grass />
			</View>
			<View style={styles.cycle}>
				<Cycle />
			</View>
			<View style={styles.running}>
				<Running />
			</View>
			<View style={styles.cloud}>
				<Cloud />
			</View>
			<View style={styles.bg}>
				<Image source={Bg} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "",
	},
	building: {
		zIndex: -1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		height: "100%",
		width: 400,
		top: 560,
	},
	dog4: {
		zIndex: 8,
		height: 600,
		width: 350,
		top: 570,
		position: "absolute",
	},
	dog5: {
		zIndex: 5,
		height: 600,
		width: 300,
		top: 430,
		left: 100,
		position: "absolute",
	},
	grass: {
		zIndex: 1,
		height: 600,
		width: 300,
		top: 400,
		left: 15,
		position: "absolute",
	},
	cycle: {
		zIndex: 8,
		height: 600,
		width: 300,
		top: 155,
		left: 20,
		position: "absolute",
	},
	running: {
		zIndex: 10,
		height: 600,
		width: 300,
		top: 160,
		left: 20,
		position: "absolute",
	},
	cloud: {
		zIndex: 15,
		height: 300,
		alignContent: "center",
		justifyContent: "center",
		width: 300,
		position: "absolute",
		top: 80,
	},
	bg: {
		zIndex: 5,
		height: 600,
		alignContent: "center",
		justifyContent: "center",
		width: 300,
		position: "absolute",
		top: -50,
		opacity: 0.5,
	},
});

export default Test;
