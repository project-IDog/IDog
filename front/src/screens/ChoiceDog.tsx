import {useState} from "react"
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native"

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";

import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png"
import MyPetThumbnail2 from "../../assets/images/my-pet-thumbnail2.png"

import ChoiceDogLayout from "../styles/choiceDogLayout";

const ChoiceDog = ({navigation} : any) => {
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

    const createAlbum = (petId: number) => {
        navigation.navigate("CreateFeed",{selectedId: petId});
    }

    return(
        <>
            <CommonLayout>
                <ColorHeader title="앨범 등록"/>

                <View style={ChoiceDogLayout.createTitle}>
                    <Text style={ChoiceDogLayout.createTitleDesc}>반려견 포토앨범</Text>
                    <Text style={ChoiceDogLayout.createMainTitle}>
                        어떤 반려견의 사진을{"\n"}
                        등록하시겠어요?
                    </Text>
                </View>

                <ScrollView horizontal={true} style={ChoiceDogLayout.myPetContent}>
                {
                    myPetList.map((myPetImage: Object, index: number) => {
                        return(     
                            <TouchableOpacity activeOpacity={0.7} onPress={() => createAlbum(myPetImage.id)}>
                                <View style={ChoiceDogLayout.myPetItem}>
                                    <Image
                                        source={myPetImage.url}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>

                <Footer/>
            </CommonLayout>
        </>
    );
}

export default ChoiceDog;