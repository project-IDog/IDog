import { View, Text } from "react-native";

import WeekTimeItemLayout from "../styles/weekTimeItemLayout";

const WeekTimeItem = ({ totalHour, day, totalMinute, totalSecond }: any) => {
	const minutes = totalMinute < 10 ? `0${totalMinute}` : totalMinute;
	const seconds = totalSecond < 10 ? `0${totalSecond}` : totalSecond;
	return (
		<>
			<View style={WeekTimeItemLayout.weekTimeItemWrap}>
				<View style={WeekTimeItemLayout.dayBox}>
					<Text style={WeekTimeItemLayout.dayText}>{day}</Text>
				</View>
				<Text style={WeekTimeItemLayout.withTimeText}>
					함께한 시간{" "}
					<Text style={WeekTimeItemLayout.boldTime}>
						{totalHour}:{minutes}:{seconds}
					</Text>
				</Text>
			</View>
		</>
	);
};

export default WeekTimeItem;
