import {View, Text, TextInput} from "react-native"
import ColorHeader from "../components/ColorHeader";
import CommonLayout from "../components/CommonLayout";
import Footer from "../components/Footer";

const CreateProfile = () => {
    return(
        <>
            <CommonLayout>
                <ColorHeader title="프로필 작성"/>
                <View>
                    <Text>반려견 NFT</Text>
                    <Text>
                        내 NFT에 저장하는,{"\n"}
                        나의 반려견
                    </Text>
                </View>
                <View>
                    <Text>사진 등록하기</Text>
                </View>

                <View>

                    <Text>반려견의 이름을 입력해주세요.</Text>
                    <TextInput></TextInput>
                    <Text>반려견의 종을 입력해주세요.</Text>
                    <TextInput></TextInput>
                    <Text>반려견의 성별을 입력해주세요.</Text>
                    <TextInput></TextInput>
                    <Text>반려견의 생일을 입력해주세요.</Text>
                    <TextInput></TextInput>

                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default CreateProfile;