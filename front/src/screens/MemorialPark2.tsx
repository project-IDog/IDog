import React, { useEffect, useState, useRef } from "react";
import { Animated, View } from "react-native";
// import MemorialParkContent from "./MemorialParkContent";
import MemorialParkLoading from "./MemorialParkLoading";

const Main: React.FC = () => {
	const opacityA = useRef(new Animated.Value(1)).current; // A.tsx의 초기 투명도 설정
	const opacityB = useRef(new Animated.Value(0)).current; // B.tsx의 초기 투명도 설정

	useEffect(() => {
		// 5초 후 애니메이션 시작
		const timer = setTimeout(() => {
			// A.tsx 서서히 사라지게 하는 애니메이션
			Animated.timing(opacityA, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}).start();

			// B.tsx를 서서히 나타나게 하는 애니메이션
			Animated.timing(opacityB, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}).start();
		}, 5000);

		// 컴포넌트가 언마운트될 때 타이머 제거
		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<Animated.View style={{ opacity: opacityB }}>
				<MemorialParkContent />
			</Animated.View>
			<Animated.View style={{ opacity: opacityA }}>
				<MemorialParkLoading />
			</Animated.View>
		</>
	);
};

export default Main;
