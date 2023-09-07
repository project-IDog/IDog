import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native"
import CommonLayout from "../components/CommonLayout"
import Footer from "../components/Footer"
import MyPet from "../components/MyPetLayout"

import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"
import MyPageMainImg from "../../assets/images/mypage-main-bg-img.png"
import MyPageThumbnail from "../../assets/images/mypage-thumbnail-img.png"
import PenIcon from "../../assets/images/pen-icon.png"
import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png"
import MyPetThumbnail2 from "../../assets/images/my-pet-thumbnail2.png"
import AddPlusIcon from "../../assets/images/add-plus-icon.png"

import MyPageLayout from "../styles/mypageLayout"

const MyPage = () => {
    return (
        <>
            <CommonLayout>
                <WhiteHeader title="마이페이지"/>
                <SubMain subTitle="마이페이지" mainTitle={`내 반려견과\n함께하는 매일,\n간편하게 관리될 수 있도록.`} bgImg={MyPageMainImg} desc="내 반려견 조회하기"/>

                <View style={MyPageLayout.myInfoWrap}>
                    <View style={MyPageLayout.myThumbnailWrap}>
                        <Image
                            source={MyPageThumbnail}
                            style={MyPageLayout.profileThumbnail}
                        />
                        <TouchableOpacity activeOpacity={0.7} style={MyPageLayout.penIconWrap}>
                            <View style={MyPageLayout.penIconButton}><Image source={PenIcon} /></View>
                        </TouchableOpacity>
                    </View>
                    <View style={MyPageLayout.myProfileInfoWrap}>
                        <View style={MyPageLayout.myTitleOuter}>
                            <Text style={MyPageLayout.myTitle}>명예 멍집사 :)</Text>
                        </View>
                        <Text style={MyPageLayout.myName}>사용자 닉네임님,</Text>
                        <View style={MyPageLayout.myProfileInfo}>
                            <Text style={MyPageLayout.myInfo}>기분 좋은 오늘 내 반려견과 함께하는{"\n"}
                            반려견 라이프 스타일, 오늘 산책 한 번 어떠세요 :)</Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <View style={MyPageLayout.editProfileButton}><Text style={MyPageLayout.editProfileButtonText}>정보수정</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={MyPageLayout.myPetWrap}>
                    <Text style={MyPageLayout.myPetTitle}>
                        내 반려견{"\n"}
                        관리하기
                    </Text>
                    <ScrollView style={MyPageLayout.myPetList} horizontal={true}>
                        <MyPet bgImg={MyPetThumbnail1} petCreatedDate="2023.09.04" petName="해피" petSpecies="레브라도 리트리버"/>
                        <MyPet bgImg={MyPetThumbnail2} petCreatedDate="2023.09.04" petName="해피" petSpecies="레브라도 리트리버"/>
                        <TouchableOpacity activeOpacity={0.7}>
                            <View style={MyPageLayout.addNewMyPetWrap}>
                                <Image
                                    source={AddPlusIcon}
                                />
                                <Text style={MyPageLayout.addNewMyPetText}>반려견 등록하기</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    )
}

export default MyPage;