import {View, Text, TextInput, TouchableOpacity} from "react-native"
import CommonLayout from "../components/CommonLayout"
import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"
import Footer from "../components/Footer"

import MyPageMainImg from "../../assets/images/mypage-main-bg-img.png"

import EditMypageLayout from "../styles/editMypageLayout"

const EditMyPage = ({navigation}: any) => {
    return(
        <>
            <CommonLayout>
                <WhiteHeader title="내 정보 수정"/>
                <SubMain subTitle="마이페이지" mainTitle={`내 반려견과\n함께하는 매일,\n간편하게 관리될 수 있도록.`} bgImg={MyPageMainImg} desc="내 반려견 조회하기"/>
                <View style={EditMypageLayout.editMyPageTitleWrap}>
                    <Text style={EditMypageLayout.editMyPageTitle}>
                        반려견 일상라이프{"\n"}
                        <Text style={EditMypageLayout.boldEditMyPageTitle}>소중한 정보</Text>를 수정해드려요
                    </Text>
                    <Text style={EditMypageLayout.editMyPageSubTitle}>매일이 행복해질 수 있도록 소중한 정보를 관리해드려요</Text>
                </View>

                <View style={EditMypageLayout.editMyPageFormWrap}>
                    <Text style={EditMypageLayout.editMyPageFormText}>변경하실 닉네임을 입력해주세요.</Text>
                    <TextInput style={EditMypageLayout.editMyPageFormInput}></TextInput>

                    <Text style={EditMypageLayout.editMyPageFormText}>변경하실 지갑주소를 입력해주세요.</Text>
                    <TextInput style={EditMypageLayout.editMyPageFormInput}></TextInput>

                </View>

                <View style={EditMypageLayout.editMyPageButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={EditMypageLayout.editButton}>
                            <Text style={EditMypageLayout.editButtonText}>회원정보 수정하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('MyPage')}>
                        <View style={EditMypageLayout.cancelButton}>
                            <Text style={EditMypageLayout.cancelButtonText}>취소하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    )
}

export default EditMyPage;