import {View, Text} from "react-native"

import WeekTimeItemLayout from "../styles/weekTimeItemLayout";

const WeekTimeItem = ({day, totalMinute, totalSecond} : any) => {
    return (
        <>
            <View style={WeekTimeItemLayout.weekTimeItemWrap}>
                <View style={WeekTimeItemLayout.dayBox}>
                    <Text style={WeekTimeItemLayout.dayText}>{day}</Text>
                </View>
                <Text style={WeekTimeItemLayout.withTimeText}>함께한 시간 <Text style={WeekTimeItemLayout.boldTime}>{totalMinute}:{totalSecond}</Text></Text>
            </View>
        </>
    )
}

export default WeekTimeItem;