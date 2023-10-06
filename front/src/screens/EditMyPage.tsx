import {useState, useEffect} from "react"
import {View, Text, TextInput, TouchableOpacity} from "react-native"
import CommonLayout from "../components/CommonLayout"
import WhiteHeader from "../components/WhiteHeader"
import SubMain from "../components/SubMain"
import Footer from "../components/Footer"
import * as SecureStore from 'expo-secure-store';

import axios from "../utils/axios"

import MyPageMainImg from "../../assets/images/mypage-main-bg-img.png"

import EditMypageLayout from "../styles/editMypageLayout"

const EditMyPage = ({navigation}: any) => {
    const [nickname, setNickname] = useState<string>();
    const [walletAddress, setWalletAddress] = useState<string>();

    const changeProfile = async () => {
        if(nickname === undefined || walletAddress === undefined || nickname === null || walletAddress === undefined || nickname === "" || walletAddress === ""){
            alert("닉네임 또는 지갑주소를 모두 입력해주세요.");
            return;
        }

        try{
            await axios.put('/user/name',{
                "userName" : nickname,
            }).then((data) => {
                if(data.status === 200){
                    try{
                        SecureStore.setItemAsync("walletAddress", String(walletAddress));
                    }catch(err){
                        alert("시스템 에러, 관리자에게 문의하세요.");
                        console.error(err);
                    }
                }
            })
            alert("회원수정이 완료되었습니다.");
            await navigation.navigate('MyPage');
        }catch(err){
            alert("시스템 에러, 관리자에게 문의하세요.");
            console.error(err);
        }
    }

    useEffect(() => {
        axios.get('/user').then((data) => {
            if(data.status === 200){
                setNickname(data.data.data.userName);
                console.log("data", data.data.data);
            }
        })

        const bindWalletAddress = async () => {
            const walletAddress = await SecureStore.getItemAsync("walletAddress");
            if(walletAddress != null){
                setWalletAddress(walletAddress);
            }
        }

        bindWalletAddress();

    }, [])
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
                    <TextInput
                        style={EditMypageLayout.editMyPageFormInput}
                        value={nickname}
                        onChangeText={(text) => setNickname(text)}
                    />

                    <Text style={EditMypageLayout.editMyPageFormText}>변경하실 지갑주소를 입력해주세요.</Text>
                    <TextInput
                        style={EditMypageLayout.editMyPageFormInput}
                        value={walletAddress}
                        onChangeText={(text) => setWalletAddress(String(text))}
                        editable={false}
                    />

                </View>

                <View style={EditMypageLayout.editMyPageButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => changeProfile()}>
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