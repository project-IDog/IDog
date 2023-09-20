import {View, Text, ImageBackground} from "react-native"
import WhiteHeader from "../components/WhiteHeader";
import BgImg from "../../assets/images/detail-feed-x.png"

import DetailFeedLayout from "../styles/detailFeedLayout";

const DetailFeed = ({route}: any) => {
    const selectImg = route.params;
    const comment = route.params.comment;
    return(
        <>
            <WhiteHeader title="포토앨범"/>
            <ImageBackground source={selectImg.selectImg} style={DetailFeedLayout.bgImg}>
                <View style={DetailFeedLayout.onInfo}>
                    <Text style={DetailFeedLayout.feedContentText}>{comment}</Text>
                    <View style={DetailFeedLayout.decoWrap}>
                        <View style={[DetailFeedLayout.decoCircle, DetailFeedLayout.firstDecoCircle]}></View>
                        <View style={DetailFeedLayout.decoCircle}></View>
                        <View style={DetailFeedLayout.decoCircle}></View>
                        <View style={DetailFeedLayout.decoCircle}></View>
                        <View style={DetailFeedLayout.decoCircle}></View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default DetailFeed;