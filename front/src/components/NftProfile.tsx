import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from "react-native"
import NftProfileLayout from "../styles/nftProfileLayout";

const NftProfile = ({dogName, createdAt, species, bgImg} : any) => {
    return(
        <>
            <View style={NftProfileLayout.nftProfileWrap}>
                    <ImageBackground source={bgImg} style={NftProfileLayout.puppyThumbnail} imageStyle={{borderRadius:10}}>
                        <View style={NftProfileLayout.darkLayout}></View>
                            <View style={NftProfileLayout.onNftInfo}>
                                <Text style={NftProfileLayout.myDogName}>내 반려견 <Text style={NftProfileLayout.boldMyDogName}>{dogName}</Text></Text>
                                <Text style={NftProfileLayout.createdDateTitle}>등록한 날짜</Text>
                                <Text style={NftProfileLayout.createdDateContent}>{createdAt}</Text>
                                <Text style={NftProfileLayout.myDogSpecies}># {species}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} style={NftProfileLayout.editButtonWrap}>
                                <View style={NftProfileLayout.editButton}><Text style={NftProfileLayout.editButtonText}>수정하기</Text></View>
                            </TouchableOpacity>
                    </ImageBackground>
            </View>
        </>
    );
}

export default NftProfile;