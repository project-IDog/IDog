import {useState} from "react"
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native"
import axios from "../utils/axios"
import { useNavigation } from "@react-navigation/native";

import ExclamationMark from "../../assets/images/circle-exclamation-mark-icon.png"

import StatusCommentModalLayout from "../styles/statusCommentModalLayout"

const StatusCommentModal = ({updateActiveStatusModal}: any) => {
    const [statusComment, setStatusComment] = useState<string>("");
    const navigation = useNavigation();

    const submitStatusComment = async () => {
        await axios.put('/user/message',{
            userMessage: statusComment,
        }).then((data) => {
            if(data.data.message === "회원 상태 메시지 수정 완료"){
                alert("상태 메시지가 수정되었습니다.");
                updateActiveStatusModal(false);
                navigation.replace("Album");
            }
        })
    }
    return(
        <>
            <View style={StatusCommentModalLayout.modalBack}></View>
            <View style={StatusCommentModalLayout.modal}>
                <Image
                    source={ExclamationMark}
                />
                <Text style={StatusCommentModalLayout.modalTitleText}>
                    내 프로필에 올라올{"\n"}
                    상태메시지를 작성해주세요.
                </Text>
                <TextInput 
                    style={StatusCommentModalLayout.commentInput}
                    placeholder="상태메시지 내용을 작성해주세요."
                    value={statusComment}
                    onChangeText={(text) => setStatusComment(text)}
                >
                </TextInput>
                <View style={StatusCommentModalLayout.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={submitStatusComment}>
                        <View style={StatusCommentModalLayout.submitButton}>
                            <Text style={StatusCommentModalLayout.submitButtonText}>작성하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateActiveStatusModal(false)}>
                        <View style={StatusCommentModalLayout.cancelButton}>
                            <Text style={StatusCommentModalLayout.cancelButtonText}>취소</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default StatusCommentModal;