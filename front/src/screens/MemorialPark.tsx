import React, { useRef, useState } from "react";
import {
	View,
	Image,
	PanResponder,
	Dimensions,
	StyleSheet,
	Text,
} from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";
import BG1 from "../../assets/images/BG1.png";

const Draggable = () => {
	const pan = useRef({ x: 0, y: 0 }).current;
	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderGrant: () => {
			pan.x = left;
			pan.y = top;
		},

		onPanResponderMove: (e, gestureState) => {
			let newX = pan.x + gestureState.dx;
			let newY = pan.y + gestureState.dy;

			const { width, height } = Dimensions.get("window");

			if (newX < 0) newX = 0;
			if (newY < 0) newY = 0;
			if (newX > width - 100) newX = width - 100;
			if (newY > height - 100) newY = height - 100;

			setLeft(newX);
			setTop(newY);
		},
		onPanResponderRelease: () => {
			// pan.x = left;
			// pan.y = top;
		},
	});

	return (
		<>
			<View
				{...panResponder.panHandlers}
				style={[
					styles.view,
					{ top: top, left: left, transform: [{ scale: 1 }] },
				]}
			>
				<Image
					source={BG1}
					style={[
						styles.view,
						{
							width: Dimensions.get("window").width * 2,
							height: Dimensions.get("window").height,
						},
					]}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	view: {
		backgroundColor: "#ffffff",
		// zIndex: 1,
		// top: responsiveHeight(0),
		// left: responsiveWidth(0),
		// backgroundColor: "red",
	},
});

export default Draggable;

// import React, { useRef, useState } from "react";
// import {
// 	View,
// 	StyleSheet,
// 	PanResponder,
// 	Dimensions,
// 	Image,
// } from "react-native";
// import BG1 from "../../assets/images/BG1.png";

// const { width, height } = Dimensions.get("window");

// const DraggableContainer = () => {
// 	const [offsetX, setOffsetX] = useState(0);
// 	const [offsetY, setOffsetY] = useState(0);
// 	const [finalOffsetX, setFinalOffsetX] = useState(0);
// 	const [finalOffsetY, setFinalOffsetY] = useState(0);

// 	const panResponder = useRef(
// 		PanResponder.create({
// 			onStartShouldSetPanResponder: () => true,
// 			onMoveShouldSetPanResponder: () => true,
// 			onPanResponderMove: (evt, gestureState) => {
// 				// 드래그 이벤트에서 x 및 y 변화 값을 추출
// 				const { dx, dy } = gestureState;
// 				setOffsetX(finalOffsetX + dx);
// 				setOffsetY(finalOffsetY + dy);
// 			},
// 			onPanResponderRelease: () => {
// 				// 드래그가 끝나면 현재 offset을 저장
// 				setFinalOffsetX(offsetX);
// 				setFinalOffsetY(offsetY);
// 			},
// 		}),
// 	).current;

// 	return (
// 		<View style={styles.container}>
// 			<View
// 				{...panResponder.panHandlers}
// 				style={[
// 					styles.contentContainer,
// 					{
// 						transform: [{ translateX: offsetX }, { translateY: offsetY }],
// 					},
// 				]}
// 			>
// 				<Image source={BG1} style={{ transform: [{ scale: 0.5 }] }} />
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		width: width,
// 		height: height,
// 		overflow: "hidden", // 드래그 시 컨텐츠가 컨테이너 밖으로 나가지 않도록 설정
// 	},
// 	contentContainer: {
// 		width: width * 1.5, // 예시를 위한 가상의 크기
// 		height: height * 1.5,
// 		display: "flex",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	element: {
// 		// 각 요소의 스타일
// 	},
// });

// export default DraggableContainer;
