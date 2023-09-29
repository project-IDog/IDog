import {useState,useEffect} from "react"
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity} from "react-native"
import CommonLayout from "../components/CommonLayout";
import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import Footer from "../components/Footer";
import {mintDogTokenContract} from "../contracts/contract"

import axios from "../utils/axios";

import AdoptionMainImg from "../../assets/images/adoption-main-img.png"
import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png"
import MyPetThumnail2 from "../../assets/images/my-pet-thumbnail2.png"

import AdoptionLayout from "../styles/adptionLayout";

const Adoption = ({navigation}: any) => {
    const [myPetPressState, setMyPetPressState] = useState({});
    const [myPetList, setMyPetList] = useState<any>();

    const toggleBorder = (index:number) => {
        setMyPetPressState((prevState: any) => ({
            ...prevState,
            [index]: !prevState[index] || false,
        }));
    }

    const submitAdoption = async () => {
        const approvalTx = await mintDogTokenContract.setApprovalForAll('0xDdc622a21B9aCCAE645cDeF23f07De884B2EC3D4', true);
        console.log("Approval Transaction hash:", approvalTx);
        const approved = await mintDogTokenContract.getApproved(103);
        console.log("approved",approved);
        await approvalTx.wait();

        const transferTx = await mintDogTokenContract.safeTransferFrom('0xDdc622a21B9aCCAE645cDeF23f07De884B2EC3D4','0x587DA3fA6997d47ca4a4815011f2d400dB065745',103);
        console.log("transferTx", transferTx);
        await transferTx.wait();
    }

    useEffect(() => {
        axios.get("/dog/list").then((data) => {
            if(data.data.message === "사용자의 모든 강아지 목록 조회 완료"){
                setMyPetList(data.data.data);
            }
        })
    }, [])
    return(
        <>
            <CommonLayout>
                <WhiteHeader title="입양 절차"/>
                <SubMain subTitle="입양하기" mainTitle={`소중한 내 반려견\n다른사람 품에서도\n항상 행복할 수 있도록.`} bgImg={AdoptionMainImg} desc="반려견 입양하기"/>
            
                <View style={AdoptionLayout.adoptionTitleWrap}>
                    <Text style={AdoptionLayout.adoptionTitleDesc}>입양시킬 내 반려견</Text>
                    <Text style={AdoptionLayout.adoptionMainTitle}>입양절차</Text>
                </View>


                <ScrollView horizontal={true} style={AdoptionLayout.myPetList}>
                    {
                        myPetList?.map((value: any, index: number) => {
                            console.log(value);
                            return(
                                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => toggleBorder(index)}>
                                    <Image
                                        source={MyPetThumbnail1}
                                        style={[
                                            myPetPressState[index] ? AdoptionLayout.myPetThumbnail : AdoptionLayout.myPetThumbnaulDisable,
                                        ]}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <View style={AdoptionLayout.adoptionFormWrap}>

                    <Text style={AdoptionLayout.adoptionFormTitle}>전달할 사람의 닉네임을 입력해주세요.</Text>
                    <TextInput style={AdoptionLayout.adoptionFormInput}></TextInput>

                    <Text style={AdoptionLayout.adoptionFormTitle}>내 반려견을 떠나보내며 한마디를 입력해주세요.</Text>
                    <TextInput style={AdoptionLayout.adoptionFormInput}></TextInput>
                
                </View>

                <View style={AdoptionLayout.adoptionButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7} style={AdoptionLayout.submitButton} onPress={submitAdoption}>
                        <View >
                            <Text style={AdoptionLayout.submitButtonText}>작성완료</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={AdoptionLayout.cancelButton} onPress={() => navigation.navigate('Profile')}>
                        <View >
                            <Text style={AdoptionLayout.cancelButtonText}>취소하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    )
}

export default Adoption;