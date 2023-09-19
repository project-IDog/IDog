import {useState} from "react"
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native"
import ExclamationMark from "../../assets/images/circle-exclamation-mark-icon.png"

import StatusCommentModalLayout from "../styles/statusCommentModalLayout"

const StatusCommentModal = (props: any) => {
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
                >
                </TextInput>
                <View style={StatusCommentModalLayout.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={StatusCommentModalLayout.submitButton}>
                            <Text style={StatusCommentModalLayout.submitButtonText}>작성하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => props.updateActiveStatusModal(false)}>
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