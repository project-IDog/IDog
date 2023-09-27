import React, { PureComponent, useCallback } from "react";
import {
	SectionList,
	StyleSheet,
	Text,
	View,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Animation from "../components/Animation";
import MainHeader from "../components/MainHeader";

const Item = React.memo<{ item: string }>(({ item }) => {
	return <Text style={styles.item}>{item}</Text>;
});

const SectionHeader = React.memo<{ title: string; number: number }>(
	({ title, number }) => {
		return (
			<Text style={styles.sectionHeader}>
				{title}, {number}
			</Text>
		);
	},
);

const styles = StyleSheet.create({
	container: {},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 49,
		fontWeight: "bold",
		backgroundColor: "red",
	},
	item: {
		padding: 10,
		fontSize: 20,
		height: 44,
	},
});

const handleScroll = (event: any) => {
	const { nativeEvent } = event;

	// contentOffset: 스크롤 뷰의 현재 스크롤 위치
	const { x, y } = nativeEvent.contentOffset;

	// contentSize: 스크롤 뷰 내용의 전체 크기
	const { width, height } = nativeEvent.contentSize;

	// layoutMeasurement: 스크롤 뷰의 레이아웃 크기
	const { width: layoutWidth, height: layoutHeight } =
		nativeEvent.layoutMeasurement;

	console.log("Scroll Position:", x, y);
	// console.log("Content Size:", width, height);
	// console.log("Layout Size:", layoutWidth, layoutHeight);
};

const SectionListBasics = (plus: number) => {
	const A = {
		title: "J",
		data: ["뽀삐", "나건", "건나", "나마스떼", "나대", "나주곰d탕"],
	};

	const [number, setnumber] = React.useState(0);
	const [sections, setSections] = React.useState([A]);

	const onEndReached = useCallback(() => {
		setnumber((prevNumber) => prevNumber + 1);
		setSections((prevSections) => [
			...prevSections,
			{ ...A, title: `J${number + 1}` },
		]);
	}, [number]);
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

		const isCloseToEnd =
			contentOffset.y + layoutMeasurement.height >=
			contentSize.height - 0.001 * contentSize.height;

		if (isCloseToEnd) {
			// 섹션 목록 끝에 근접했을 때의 로직
			console.log("Reached end of the list!");
		}
	};

	return (
		<>
			<MainHeader />
			<View
				style={[
					styles.container,
					// { height: responsiveHeight(100) },
				]}
			>
				<SectionList
					sections={sections}
					// onScroll={handleScroll}
					scrollEventThrottle={16}
					renderItem={({ item }) => <Item item={item} />}
					renderSectionHeader={({ section }) => (
						<SectionHeader title={section.title} number={number} />
					)}
					keyExtractor={(item) => `basicListEntry-${item}`}
					onEndReached={onEndReached}
					inverted={true}
					onEndReachedThreshold={plus}
					disableVirtualization={false}
					onScroll={handleScroll}
					// scrollEventThrottle={16}
				/>
			</View>
		</>
	);
};

export default SectionListBasics;
