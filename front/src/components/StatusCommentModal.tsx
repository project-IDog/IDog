import {View, Text, Image, TextInput, TouchableOpacity} from "react-native"
import ExclamationMark from "../../assets/images/circle-exclamation-mark-icon.png"
import BlackPenIcon from "../../assets/images/black-pen-icon.png"

const StatusCommentModal = () => {
    return(
        <>
            <View>
                <View>
                    <Image
                        source={ExclamationMark}
                    />
                    <Text>
                        내 프로필에 올라올{"\n"}
                        상태메시지를 작성해주세요.
                    </Text>
                    <TextInput>
                        <Image
                            source={BlackPenIcon}
                        />
                    </TextInput>
                    <View>
                        <TouchableOpacity activeOpacity={0.7}>
                            <View>
                                <Text>작성하기</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7}>
                            <View>
                                <Text>취소</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default StatusCommentModal;