import {useState} from "react"
import {View, Text, ImageBackground, TouchableOpacity} from "react-native"
import MyPetLayout from "../styles/myPet"

const MyPet = ({bgImg, petCreatedDate, petName, petSpecies}: any) => {
    const [petCardState, setPetCardState] = useState<Boolean>(false);

    const activeCardInfo = () => {
        setPetCardState(true);
    }

    const disableCardInfo = () => {
        setPetCardState(false);
    }
    return(
        <>
            <TouchableOpacity activeOpacity={0.7} onPress={activeCardInfo}>
                <View style={MyPetLayout.myPetWrap}>
                    <ImageBackground source={bgImg} style={MyPetLayout.myPetBg} imageStyle={{borderRadius: 15}}>
                        {
                            petCardState ?
                            <>
                                <TouchableOpacity activeOpacity={0.7} onPress={disableCardInfo}>
                                    <View style={MyPetLayout.darkLayout}></View>
                                    <View style={MyPetLayout.myPetInfo}>
                                        <Text style={MyPetLayout.myPetCreatedAt}>등록일자. {petCreatedDate}</Text>
                                        <Text style={MyPetLayout.myPetNameTitle}>Pet Name.</Text>
                                        <Text style={MyPetLayout.myPetName}>{petName}</Text>
                                        <Text style={MyPetLayout.myPetSpecies}># {petSpecies}</Text>
                                        <TouchableOpacity activeOpacity={0.7}>
                                            <View style={MyPetLayout.myPetEditButton}><Text style={MyPetLayout.myPetEditButtonText}>수정하기</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </>
                            :
                            <></>
                        }
                        
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </>
    );
}

export default MyPet;