import {useEffect} from "react"
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import CommonLayout from "../components/CommonLayout"
import ProfileItem from "../components/ProfileItem"
import NftProfile from "../components/NftProfile"
import Footer from "../components/Footer"

import axios from "../utils/axios"

import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"
import SubMainImg from "../../assets/images/sub-main-bg.png"
import rightArrowIcon from "../../assets/images/right-arrow.png"
import ProfileLayout from "../styles/profileLayout"
import NftCardIcon from "../../assets/images/nft-card-icon.png"
import AdoptionIcon from "../../assets/images/adoption-icon.png"
import CertificateIcon from "../../assets/images/certificate-icon.png"
import AddPlusIcon from "../../assets/images/add-plus-icon.png"
import PuppyThumbnail1 from "../../assets/images/puppy-thumbnail1.png"


const Profile = ({navigation}:any) => {
    useEffect(() => {
        axios.get('/user').then((data) => {
            if(String(data) === "session expire"){
                navigation.navigate('Main');
            }
        })
    }, [])
    return(
        <>
            <CommonLayout>
                <WhiteHeader title="프로필 만들기"/>
                <SubMain subTitle="NFT 프로필" mainTitle={`OOO은 내 반려견의\n프로필을 NFT로 만들어\n평생 소장 프로필을 만듭니다.`} bgImg={SubMainImg} desc="프로필 만들기"/>
                <View style={ProfileLayout.profileWrap}>
                    <Text style={ProfileLayout.subTitle}>NFT Service</Text>
                    <View style={ProfileLayout.titleWrap}>
                        <Text style={ProfileLayout.mainTitle}>더 쉽고 간편한{"\n"}반려견 소유 증명</Text>
                        <Image
                            source={rightArrowIcon}
                            style={ProfileLayout.rightArrowIcon}
                        />
                    </View>
                    <ScrollView style={ProfileLayout.iconWrap} horizontal={true}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CreateProfile')}>
                            <ProfileItem desc="평생 소장하는 내 반려견 NFT 프로필" title="프로필 만들기" thumbnail={NftCardIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Adoption')}>
                            <ProfileItem desc="간편한 소유권 변경" title="입양절차" thumbnail={AdoptionIcon}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7}>
                            <ProfileItem desc="내 반려견 NFT를 모아보여드려요" title="반려견 족보" thumbnail={CertificateIcon}/>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={ProfileLayout.myNftWrap}>
                    <View style={ProfileLayout.myNftTitleWrap}>
                        <Text style={ProfileLayout.myNftTitle}>내 보유 NFT</Text>
                        <Text style={ProfileLayout.myNftMore}>전체보기</Text>
                    </View>
                    <ScrollView horizontal={true} style={ProfileLayout.nftList}>
                        <NftProfile dogName="해피" createdAt="2023. 09. 02." species="시베리안허스키" bgImg={PuppyThumbnail1} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CreateProfile')}>
                            <View style={ProfileLayout.addNewNftWrap}>
                                <Image
                                    source={AddPlusIcon}
                                />
                                <Text style={ProfileLayout.newButtonText}>반려견 등록하기</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default Profile;