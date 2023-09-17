import {useState, useRef, useEffect} from "react"
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native"
import dayjs from "dayjs"
import CommonLayout from "../components/CommonLayout"
import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"
import Footer from "../components/Footer"
import WeekTimeItem from "../components/weekTimeItem"

import WalkMainImg from "../../assets/images/walk-main-img.png"
import TimerImg from "../../assets/images/timer.png"
import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png"
import MyPetThumbnail2 from "../../assets/images/my-pet-thumbnail2.png"
import BottomArrowIcon from "../../assets/images/bottom-arrow-icon.png"

import WalkLayout from "../styles/walkLayout"

const Walk = ({navigation}: any) => {
    const [now, setNow] = useState<any>(dayjs());
    const [todayDate, setTodayDaye] = useState<number>(now.format("DD"));
    const [todayDay, setTodayDay] = useState<number>(now.get("day"));

    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);
    const timerId = useRef<any>(null);
    const [weekList, setWeekList] = useState<Object[]>(
        [

        ]
    );

    const [myPetList, setMyPetList] = useState<Object[]>(
        [
            {
                id:1,
                url:MyPetThumbnail1
            },
            {
                id:2,
                url:MyPetThumbnail2
            }
        ]
    );
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    const toggleImageSelection = (id: number) => {
        const isSelected = selectedImages.includes(id);
    
        if (isSelected) {
            setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    const minusDate = (offset: number) => {
        return dayjs().subtract(offset, "day").get('date');
    }

    const plusDate = (offset: number) => {
        return dayjs().add(offset, "day").get('date');
    }

    const minusDay = (offset: number) => {
        let temp = dayjs().subtract(offset, "day").get('day');
        if(temp < 0){
            return 7 - (-1) * temp;
        }else{
            return temp;
        }
    }

    const plusDay = (offset: number) => {
        let temp = dayjs().add(offset, "day").get('day');
        if(temp < 0){
            return 7 - (-1) * temp;
        }else{
            return temp;
        }
    }

    const startTimer = () => {
        timerId.current = setInterval(() => {
            setSecond((prevSecond) => prevSecond + 1);
        }, 1000);
    }

    const finishTimer = () => {
        clearInterval(timerId.current);
        for(let i=0; i<weekList.length; i++){
            if(dayjs().get("date") === parseInt(weekList[i].day)){
                weekList[i].itemMinute = minute;
                weekList[i].itemSecond = second;
                setWeekList([...weekList]);
                return;
            }
        }
        setWeekList([...weekList, {day:todayDate, itemMinute:minute, itemSecond: second}]);
    }

    const days = [minusDay(3), minusDay(2), minusDay(1), todayDay, plusDay(1), plusDay(2), plusDay(3)];
    const dates = [minusDate(3),minusDate(2),minusDate(1),todayDate,plusDate(1),plusDate(2),plusDate(3)];
    useEffect(() => {
        if(second > 59){
            setMinute((prevMinute) => prevMinute + 1);
            setSecond(0);
        }
        if(minute > 59){
            setHour((prevHour) => prevHour + 1);
            setMinute(0);
        }
    }, [timerId, second])
    return(
        <>
            <CommonLayout>
                <WhiteHeader title="함께 걷는 시간"/>
                <SubMain subTitle="산책루트" mainTitle={`내 반려견과\n함께걷는 오늘,\n더 행복한 여정이 되도록.`} bgImg={WalkMainImg} desc="산책 빈도 측정" />

                <View style={WalkLayout.calendarTitleWrap}>
                    <Text style={WalkLayout.calendarDesc}>반려견과 함께 걷는 오늘</Text>
                    <Text style={WalkLayout.calendarTitle}>
                        이번주 <Text style={WalkLayout.boldCalendarTitle}>새로운 산책 시간</Text>을{"\n"}
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
                                                (day === 0 || day === 6) ?
                                                <Text style={[WalkLayout.dayText, WalkLayout.centerDayText, WalkLayout.redDayText]}>
                                                    {
                                                        day === 0 ? "S" : day===6 ? "S" : ""
                                                    }
                                                </Text>
                                                :
                                                <Text style={[WalkLayout.dayText, WalkLayout.centerDayText]}>
                                                    {
                                                        day === 0 ? "S" : day===1 ? "M" : day===2 ? "T" : day===3 ? "W" : day===4 ? "T" : day===5 ? "F" : day===6 ? "S" : ""
                                                    }
                                                </Text>
                                            :
                                            (day === 0 || day === 6) ?
                                                <Text style={[WalkLayout.dayText, WalkLayout.redDayText]}>
                                                    {
                                                        day === 0 ? "S" : day===6 ? "S" : ""
                                                    }
                                                </Text>
                                                :
                                                <Text style={[WalkLayout.dayText]}>
                                                    {
                                                        day === 0 ? "S" : day===1 ? "M" : day===2 ? "T" : day===3 ? "W" : day===4 ? "T" : day===5 ? "F" : day===6 ? "S" : ""
                                                    }
                                                </Text>
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

                <View style={WalkLayout.choiceWrap}>
                    <View style={WalkLayout.titleFlexWrap}>
                        <View>
                            <Text style={WalkLayout.nameTitle}>김싸피님,</Text>
                            <Text style={WalkLayout.mainTitle}>함께 나갈 반려견을 선택해주세요</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7}>
                            <View style={WalkLayout.tabWrap}>
                                <Text style={WalkLayout.tabText}>산책 빈도 보기</Text>
                                <Image
                                    source={BottomArrowIcon}
                                    style={WalkLayout.tabImage}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={WalkLayout.myPetContent}>
                        {
                            myPetList.map((myPetImage: Object, index: number) => {
                                return(     
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => toggleImageSelection(myPetImage.id)}>
                                        <View style={WalkLayout.myPetItem}>
                                            <Image
                                                source={myPetImage.url}
                                                style={{
                                                    borderWidth: 4,
                                                    borderColor: selectedImages.includes(myPetImage.id) ? '#EE8A72' : 'transparent',
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
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
                                <Text style={WalkLayout.timerText}>
                                    {
                                        second < 10 ?
                                            minute < 10?
                                            `${hour} : 0${minute} : 0${second}`
                                            :
                                            `${hour} : ${minute} : 0${second}`
                                        :
                                            minute < 10?
                                            `${hour} : 0${minute} : ${second}`
                                            :
                                            `${hour} : ${minute} : ${second}`
                                    }
                                </Text>
                            </View>
                            <View style={WalkLayout.todayTimerButtonWrap}>
                                <TouchableOpacity activeOpacity={0.7} onPress={startTimer}>
                                    <View style={WalkLayout.startButton}><Text style={WalkLayout.startButtonText}>산책 시작</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} onPress={finishTimer}>
                                    <View style={WalkLayout.finishButton}><Text style={WalkLayout.finishButtonText}>산책 종료</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={WalkLayout.listWrap}>
                            <Text style={WalkLayout.weekListTitle}>이번주 내 반려견 산책</Text>
                            <View>
                                {
                                    weekList.map((value, index) => {
                                        return(
                                            <View key={index}>
                                                <WeekTimeItem day={value.day} totalMinute={value.itemMinute} totalSecond={value.itemSecond}/>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            {/* <Text style={WalkLayout.totalTimeText}>이번 주 총 함께한 시간 <Text style={WalkLayout.boldTotalTimeText}>1:46:19</Text></Text> */}
                        </View>
                    </View>
                </View>

                <Footer/>
            </CommonLayout>
        </>
    )
}

export default Walk;