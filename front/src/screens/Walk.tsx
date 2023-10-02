import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import dayjs from "dayjs";
import CommonLayout from "../components/CommonLayout";
import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import Footer from "../components/Footer";
import WeekTimeItem from "../components/weekTimeItem";
import MyPetScrollView from "../components/MyPetScrollView";

import WalkMainImg from "../../assets/images/walk-main-img.png";
import TimerImg from "../../assets/images/timer.png";
import BottomArrowIcon from "../../assets/images/bottom-arrow-icon.png";

import WalkLayout from "../styles/walkLayout";
import Widget from "./Widget";
import WalkStatistics from "../components/WalkStatistics";

import axios from "../utils/axios";

const Walk = ({ navigation }: any) => {
	const [now, setNow] = useState<any>(dayjs());
	const [todayDate, setTodayDate] = useState<number>(now.format("DD"));
	const [todayDay, setTodayDay] = useState<number>(now.get("day"));

	const [weekList, setWeekList] = useState<Object[]>([]);

	const [userName, setUserName] = useState<string>("");
	const [userDogs, setUserDogs] = useState<Object[]>([]);
	const [selectedDogNo, setSelectedDogNo] = useState<number>();
	const [selectedDogImg, setSelectedDogImg] = useState<string>();
	const [weekTotalTime, setWeekTotalTime] = useState<String>("");
	const [walkingChartCheck, setWalkingChartCheck] = useState<boolean>(false);

	const getUserInfo = async () => {
		const response = await axios.get("/user");
		const data = response.data.data;
		setUserName(data.userName);
	};

	const getUserFullListDogs = async () => {
		const response = await axios.get("/dog/list");
		const data = response.data.data;
		setUserDogs(data);
		console.log("data : ", data);
	};

	const getWalkingWeek = async () => {
		const response = await axios.get("/walking");
		const data = response.data.data;
		setWeekList(data);
		console.log("data : ", data);
	};

	const getRecentWeekData = (data: any) => {
		const oneWeekAgo = dayjs().subtract(7, "day");
		return data.filter((item: any) =>
			dayjs(item.walkingStartDate).isAfter(oneWeekAgo),
		);
	};

	const convertToTimeWithString = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.floor((totalSeconds % 3600) % 60);
		return { hours, minutes, seconds, totalSeconds };
	};

	const convertChartAndWalking = () => {
		setWalkingChartCheck(!walkingChartCheck);
	};

	const filteredWeekList = getRecentWeekData(weekList);

	useEffect(() => {
		getUserInfo();
		getUserFullListDogs();
		getWalkingWeek();
	}, []);

	useEffect(() => {
		const time = convertToTimeWithString(totalSecondsSum);
		const hours = time.hours;
		const minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
		const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
		setWeekTotalTime(`${hours}:${minutes}:${seconds}`);
	}, [filteredWeekList]);

	useEffect(() => {
		console.log("selectedDogNo : ", selectedDogNo);
		console.log("selectedDogImg : ", selectedDogImg);
	}, [selectedDogNo, selectedDogImg]);

	const minusDate = (offset: number) => {
		return dayjs().subtract(offset, "day").get("date");
	};

	const plusDate = (offset: number) => {
		return dayjs().add(offset, "day").get("date");
	};

	const minusDay = (offset: number) => {
		let temp = dayjs().subtract(offset, "day").get("day");
		if (temp < 0) {
			return 7 - -1 * temp;
		} else {
			return temp;
		}
	};

	const plusDay = (offset: number) => {
		let temp = dayjs().add(offset, "day").get("day");
		if (temp < 0) {
			return 7 - -1 * temp;
		} else {
			return temp;
		}
	};

	const days = [
		minusDay(3),
		minusDay(2),
		minusDay(1),
		todayDay,
		plusDay(1),
		plusDay(2),
		plusDay(3),
	];
	const dates = [
		minusDate(3),
		minusDate(2),
		minusDate(1),
		todayDate,
		plusDate(1),
		plusDate(2),
		plusDate(3),
	];

	let totalSecondsSum = 0;
	const weekItems = filteredWeekList.map((value, index) => {
		console.log("value : ", value);

		const time = convertToTimeWithString(value.timeSum);
		console.log("time : ", time);
		totalSecondsSum += time.totalSeconds;
		return (
			<View key={index}>
				<WeekTimeItem
					day={dayjs(value.walkingStartDate).format("DD")}
					totalHour={time.hours}
					totalMinute={time.minutes}
					totalSecond={time.seconds}
				/>
			</View>
		);
	});

	return (
		<>
			<CommonLayout>
				<WhiteHeader title="함께 걷는 시간" />
				<SubMain
					subTitle="산책루트"
					mainTitle={`내 반려견과\n함께걷는 오늘,\n더 행복한 여정이 되도록.`}
					bgImg={WalkMainImg}
					desc="산책 통계 확인"
				/>
				{/* <View style={WalkLayout.statistics}>
					<View style={WalkLayout.timerTitleWrap}>
						<Text style={WalkLayout.timerMainTitle}>함께 걸었던 시간</Text>
						<Text style={WalkLayout.timerSubTitle}>
							3개월간 함께 걸었던 횟수를 측정합니다.
						</Text>
					</View>
					<WalkStatistics weekList={weekList} />
				</View> */}
				<View style={WalkLayout.calendarTitleWrap}>
					<Text style={WalkLayout.calendarDesc}>반려견과 함께 걷는 오늘</Text>
					<Text style={WalkLayout.calendarTitle}>
						이번주{" "}
						<Text style={WalkLayout.boldCalendarTitle}>새로운 산책 시간</Text>을
						{"\n"}
						측정합니다.
					</Text>
				</View>
				<View style={WalkLayout.calendarWrap}>
					<View style={WalkLayout.daysWrap}>
						{days.map((day, index) => {
							return (
								<View key={index}>
									{index == 3 ? (
										day === 0 || day === 6 ? (
											<Text
												style={[
													WalkLayout.dayText,
													WalkLayout.centerDayText,
													WalkLayout.redDayText,
												]}
											>
												{day === 0 ? "S" : day === 6 ? "S" : ""}
											</Text>
										) : (
											<Text
												style={[WalkLayout.dayText, WalkLayout.centerDayText]}
											>
												{day === 0
													? "S"
													: day === 1
													? "M"
													: day === 2
													? "T"
													: day === 3
													? "W"
													: day === 4
													? "T"
													: day === 5
													? "F"
													: day === 6
													? "S"
													: ""}
											</Text>
										)
									) : day === 0 || day === 6 ? (
										<Text style={[WalkLayout.dayText, WalkLayout.redDayText]}>
											{day === 0 ? "S" : day === 6 ? "S" : ""}
										</Text>
									) : (
										<Text style={[WalkLayout.dayText]}>
											{day === 0
												? "S"
												: day === 1
												? "M"
												: day === 2
												? "T"
												: day === 3
												? "W"
												: day === 4
												? "T"
												: day === 5
												? "F"
												: day === 6
												? "S"
												: ""}
										</Text>
									)}
								</View>
							);
						})}
					</View>
					<View style={WalkLayout.datesWrap}>
						{dates.map((date, index) => {
							return (
								<View key={index}>
									{index == 3 ? (
										<Text
											style={[WalkLayout.dateText, WalkLayout.centerDateText]}
										>
											{date}
										</Text>
									) : (
										<Text style={WalkLayout.dateText}>{date}</Text>
									)}
								</View>
							);
						})}
					</View>
				</View>
				<View style={WalkLayout.choiceWrap}>
					<View style={WalkLayout.titleFlexWrap}>
						{/* 여기는 유저정보 불러오기 */}
						<View>
							<Text style={WalkLayout.nameTitle}>{userName}님,</Text>
							<Text style={WalkLayout.mainTitle}>
								함께 나갈 반려견을 선택해주세요
							</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => convertChartAndWalking()}
						>
							<View style={WalkLayout.tabWrap}>
								{walkingChartCheck ? (
									<Text style={WalkLayout.tabText}>산책 통계보기</Text>
								) : (
									<Text style={WalkLayout.tabText}>산책 시작하기</Text>
								)}
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<MyPetScrollView
					userDogs={userDogs}
					setSelectedDogNo={setSelectedDogNo}
					setSelectedDogImg={setSelectedDogImg}
				/>
				{/* 여기가 내 강아지 목록 */}
				{!walkingChartCheck ? (
					<View style={WalkLayout.timerWrap}>
						<View style={WalkLayout.timerTitleWrap}>
							<Text style={WalkLayout.timerMainTitle}>함께 걸었던 시간</Text>
							<Text style={WalkLayout.timerSubTitle}>
								3개월간 함께 걸었던 횟수가 측정됩니다.
							</Text>
						</View>
						<WalkStatistics weekList={weekList} />
					</View>
				) : (
					<View style={WalkLayout.timerWrap}>
						<View style={WalkLayout.timerTitleWrap}>
							<Text style={WalkLayout.timerMainTitle}>함께 걷는 시간</Text>
							<Text style={WalkLayout.timerSubTitle}>
								산책시간 버튼을 누르면 자동으로 오늘의 산책시간이 측정됩니다.
							</Text>
						</View>
						<View style={WalkLayout.contentFlexWrap}>
							<Widget getWalkingWeek={getWalkingWeek} />
							<View style={WalkLayout.listWrap}>
								<Text style={WalkLayout.weekListTitle}>
									최근 7일 내 반려견 산책
								</Text>
								<View>{weekItems}</View>
								<Text style={WalkLayout.totalTimeText}>
									7일간 함께한 총 시간{" "}
									<Text style={WalkLayout.boldTotalTimeText}>
										{weekTotalTime}
									</Text>
								</Text>
							</View>
						</View>
					</View>
				)}

				<Footer />
			</CommonLayout>
		</>
	);
};

export default Walk;
