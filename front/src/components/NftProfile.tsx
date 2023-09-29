import {View, Text, ImageBackground, TouchableOpacity} from "react-native"
import NftProfileLayout from "../styles/nftProfileLayout";
import { useNavigation } from '@react-navigation/native';

const NftProfile = ({dogName, createdTitle, createdAt, species, bgImg} : any) => {
    const navigation = useNavigation();
    return(
        <>
            <View style={NftProfileLayout.nftProfileWrap}>
                <ImageBackground source={{uri:bgImg}} style={NftProfileLayout.puppyThumbnail} imageStyle={{borderRadius:10}}>
                    <View style={NftProfileLayout.darkLayout}></View>
                    <View style={NftProfileLayout.onNftInfo}>
                        <Text style={NftProfileLayout.myDogName}><Text style={NftProfileLayout.boldMyDogName}>{dogName}</Text></Text>
                        <Text style={NftProfileLayout.createdDateTitle}>{createdTitle}</Text>
                        <Text style={NftProfileLayout.createdDateContent}>{createdAt}</Text>
                        <Text style={NftProfileLayout.myDogSpecies}># {species}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={NftProfileLayout.editButtonWrap} onPress={() => navigation.navigate('EditProfile')}>
                        <View style={NftProfileLayout.editButton}><Text style={NftProfileLayout.editButtonText}>수정하기</Text></View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </>
    );
}

export default NftProfile;