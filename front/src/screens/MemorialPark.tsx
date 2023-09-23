import {
	View,
	Text,
	StyleSheet,
	Animated,
	ScrollView,
	NativeSyntheticEvent,
	NativeScrollEvent,
	Image,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import IndexStore from "../stores/IndexStore";
import MainHeader from "../components/MainHeader";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Animation from "../components/Animation";
import BG1 from "../../assets/images/BG1.png";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import Colors from "../stores/ColorStore";

type GraveData = {
	message: string;
	data: {
		graveNo: string;
		userNo: string;
		userName: string;
		dogNo: string;
		dogName: string;
		dogBirthDate: string;
		dogBreed: string;
		dogDeathDate: string;
		dogSex: string;
		dogNft: string;
	};
};

const Main = ({ navigation }: any) => {
	const scrollViewRef = useRef<ScrollView>(null);
	useEffect(() => {
		setTimeout(() => {
			scrollViewRef.current?.scrollToEnd({ animated: false });
		}, 50);
	}, []);

	const initialData: GraveData = {
		message: "무덤 조회 완료",
		data: {
			graveNo: "0",
			userNo: "0",
			userName: "나무",
			dogNo: "0",
			dogName: "강아지",
			dogBirthDate: "2112.12.31",
			dogBreed: "시간역행개",
			dogDeathDate: "2100.01.01",
			dogSex: "M",
			dogNft: "0x...",
		},
	};

	const [dataList, setDataList] = useState<GraveData[]>([initialData]);
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

	const [atTop, setAtTop] = React.useState(false);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;

		if (contentOffset.y <= 0) {
			// 스크롤이 맨 위에 도달했을 때
			setAtTop(true);
			// const newData = getNewData(); // 새로운 데이터를 가져오는 함수
			// setData((prevData) => [...newData, ...prevData]);
		} else {
			// 스크롤이 맨 위가 아닐 때
			setAtTop(false);
		}
	};

	const handleScrollEndDrag = (
		event: NativeSyntheticEvent<NativeScrollEvent>,
	) => {
		const { contentOffset } = event.nativeEvent;
		console.log(contentOffset);

		if (atTop && contentOffset.y <= 0) {
			console.log("맨꼭데기여!!");
			const newData = getNewData(); // 새로운 데이터를 가져오는 함수
			setDataList((prevList) => [newData, ...prevList]); // 배열의 앞에 추가
		}
	};

	const getNewData = (): GraveData => {
		// 새로운 데이터를 반환하는 로직
		// 이 부분은 데이터를 추가하는 로직
		return initialData;
	};

	// const startColor = "#2b2a57";
	// const endColor = "#ffffff"; // 우주의 어두운 보라색
	return (
		<>
			<ScrollView
				onScroll={handleScroll}
				onScrollEndDrag={handleScrollEndDrag}
				scrollEventThrottle={16}
				contentOffset={{ x: 0, y: 10000 }}
				ref={scrollViewRef}
			>
				<MainHeader></MainHeader>
				<View style={MemorialParkDesignLayout.nftcontainer}>
					{dataList.map((data, index) => (
						<View
							key={index}
							style={[
								MemorialParkDesignLayout.nftview,
								{
									backgroundColor:
										Colors[dataList.length - (index % Colors.length)],
								},
							]}
						>
							<Text>{data.data.dogName}</Text>
							<Text>{data.data.dogBirthDate}</Text>
							<Text>{data.data.dogBreed}</Text>
							<Text>{data.data.dogDeathDate}</Text>
							<Text>{data.data.dogSex}</Text>
							<Image
								source={BG1}
								style={[
									MemorialParkDesignLayout.nftbg,
									// { backgroundColor: "#EF2F23" },
								]}
							/>
							<View style={[{ backgroundColor: "#f2f2f2" }]}>
								<Text>hello</Text>
							</View>
						</View>
					))}
				</View>
				<View style={MemorialParkDesignLayout.view1}>
					<Animation />
				</View>
			</ScrollView>
		</>
	);
};

export default Main;
