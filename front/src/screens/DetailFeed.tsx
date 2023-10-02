import {View, Text, ImageBackground, TouchableOpacity, Image, Alert} from "react-native"
import WhiteHeader from "../components/WhiteHeader"
import axios from "../utils/axios"

import BgImg from "../../assets/images/detail-feed-x.png"
import TrashCanIcon from "../../assets/images/trashcan-icon.png"
import DetailFeedLayout from "../styles/detailFeedLayout"

const DetailFeed = ({navigation, route}: any) => {
    const selectImg = route.params.selectImg;
    const comment = route.params.comment;
    const photoNo = route.params.photoNo;

    const removeImage = () => {
        axios.delete(`/photo/${photoNo}`).then((data)=>{
            if(data.data.message === "사진 삭제 성공"){
                navigation.replace('Album');
            }
        })
    }

    const activeRemoveAlert = () => {
        Alert.alert("정말로 삭제하시겠습니까?","",[
            {
                text: "삭제하기",
                onPress: () => {
                    removeImage();
                }
            },
            {
                text: "취소하기",
                onPress: () => {

                }
            }
        ]);
    }
    return(
        <>
            <WhiteHeader title="포토앨범"/>
            <ImageBackground source={selectImg} style={DetailFeedLayout.bgImg}>
                <TouchableOpacity activeOpacity={0.7} style={DetailFeedLayout.trashIconWrap} onPress={activeRemoveAlert}>
                    <Image
                        source={TrashCanIcon}
                        style={DetailFeedLayout.trashIcon}
                    />
                </TouchableOpacity>
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