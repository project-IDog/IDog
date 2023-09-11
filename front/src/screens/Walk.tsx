import {View, Text, TouchableOpacity, Image} from "react-native"
import dayjs from "dayjs"
import CommonLayout from "../components/CommonLayout"
import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"
import Footer from "../components/Footer"

import WalkMainImg from "../../assets/images/walk-main-img.png"
import TimerImg from "../../assets/images/timer.png"

import WalkLayout from "../styles/walkLayout"

const Walk = () => {
    let now = dayjs();
    const todayMonth = now.format("MM");
    const todayDay = now.format("DD");
    console.log(todayMonth);
    console.log(todayDay);
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const dates = [3,4,5,todayDay,7,8,9];
    return(
        <>
            <CommonLayout>
                <WhiteHeader title="함께 걷는 시간"/>
                <SubMain subTitle="산책루트" mainTitle={`내 반려견과\n함께걷는 오늘,\n더 행복한 여정이 되도록.`} bgImg={WalkMainImg} desc="산책 빈도 측정" />

                <View style={WalkLayout.calendarTitleWrap}>
                    <Text style={WalkLayout.calendarDesc}>반려견과 함께 걷는 오늘</Text>
                    <Text style={WalkLayout.calendarTitle}>
                        이번주 새로운 산책 시간을{"\n"}
                        측정합니다.
                    </Text>
                </View>
                <View style={WalkLayout.calendarWrap}>
                    <View style={WalkLayout.daysWrap}>
                        {
                            days.map((day, index) => {
                                return ( 
                                    <View key={index}>
                                        {
                                            index == 3 ?
                                            <Text style={[WalkLayout.dayText, WalkLayout.centerDayText]}>{day}</Text>
                                            :
                                            <Text style={WalkLayout.dayText}>{day}</Text>
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={WalkLayout.datesWrap}>
                        {
                            dates.map((date, index) => {
                                return(
                                    <View key={index}>  
                                    {
                                        index == 3 ?
                                        <Text style={[WalkLayout.dateText, WalkLayout.centerDateText]}>{date}</Text>
                                        :
                                        <Text style={WalkLayout.dateText}>{date}</Text>
                                    }
                                        
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>


                <View style={WalkLayout.timerWrap}>
                    <View style={WalkLayout.timerTitleWrap}>
                        <Text style={WalkLayout.timerMainTitle}>함께 걷는 시간</Text>
                        <Text style={WalkLayout.timerSubTitle}>산책시간 버튼을 누르면 자동으로 오늘의 산책시간이 측정됩니다.</Text>
                    </View>

                    <View style={WalkLayout.contentFlexWrap}>
                        <View style={WalkLayout.contentWrap}>
                            <Text style={WalkLayout.todayTimerTitle}>오늘의 산책시간</Text>
                            <View style={WalkLayout.timer}>
                                <Image
                                    source={TimerImg}
                                    style={WalkLayout.timerImg}
                                />
                                <Text style={WalkLayout.timerText}>0:00:00</Text>
                            </View>
                            <View style={WalkLayout.todayTimerButtonWrap}>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <View style={WalkLayout.startButton}><Text style={WalkLayout.startButtonText}>산책 시작</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <View style={WalkLayout.finishButton}><Text style={WalkLayout.finishButtonText}>산책 종료</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={WalkLayout.listWrap}>
                            <Text style={WalkLayout.weekListTitle}>이번주 내 반려견 산책</Text>
                        </View>
                    </View>
                </View>

                <Footer/>
            </CommonLayout>
        </>
    )
}

export default Walk;