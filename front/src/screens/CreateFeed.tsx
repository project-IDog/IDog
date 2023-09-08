import {View,Text,Image,TextInput,TouchableOpacity} from "react-native"
import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";

import AddPlusIcon from "../../assets/images/add-plus-icon.png"

import CreateFeedLayout from "../styles/createFeedLayout";

const CreateFeed = ({navigation}: any) => {
    return(
        <>
            <CommonLayout>
                <ColorHeader title="앨범등록"/>
                <View style={CreateFeedLayout.createTitle}>
                    <Text style={CreateFeedLayout.createTitleDesc}>반려견 포토앨범</Text>
                    <Text style={CreateFeedLayout.createMainTitle}>
                        내 피드에 저장하는,{"\n"}
                        나의 반려견
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <View style={CreateFeedLayout.photoUploadWrap}>
                        <Image
                            source={AddPlusIcon}
                        />
                        <Text>사진 등록하기</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TextInput
                        style={CreateFeedLayout.createDescWrap}
                        placeholder="문구 입력..."
                    />
                </View>

                <View style={CreateFeedLayout.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={CreateFeedLayout.submitButton}>
                            <Text style={CreateFeedLayout.submitButtonText}>앨범 등록하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Album')}>
                        <View style={CreateFeedLayout.cancelButton}>
                            <Text style={CreateFeedLayout.cancelButtonText}>취소하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    )
}

export default CreateFeed;