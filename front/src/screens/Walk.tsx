import {View, Text} from "react-native"
import CommonLayout from "../components/CommonLayout"
import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"

import WalkMainImg from "../../assets/images/walk-main-img.png"

const Walk = () => {
    return(
        <>
            <CommonLayout>
                <WhiteHeader title="함께 걷는 시간"/>
                <SubMain subTitle="산책루트" mainTitle={`내 반려견과\n함께걷는 오늘,\n더 행복한 여정이 되도록.`} bgImg={WalkMainImg} desc="산책 빈도 측정" />
            </CommonLayout>
        </>
    )
}

export default Walk;