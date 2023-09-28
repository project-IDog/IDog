import {useState,useEffect} from "react"
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity} from "react-native"
import CommonLayout from "../components/CommonLayout";
import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import Footer from "../components/Footer";

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

    const submitAdoption = () => {
        axios.post("/dog/nft",{
            "dogNo": "",
        }).then((data) => {

        })
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

                <Image source={"data:text/html;base64,PGltZyBzcmM9Imh0dHBzOi8vcHBvYmJpLnMzLmFwLW5vcnRoZWFzdC0yLmFtYXpvbmF3cy5jb20vMTZjOTMyNzYtNjZlZi00YTFiLTgyMzItMTZiNzE3YjkyMmJmLmpwZWciIC8+"}/>

                <ScrollView horizontal={true} style={AdoptionLayout.myPetList}>
                    {
                        myPetList?.map((value: any, index: number) => {
                            console.log(value);
                            return(
                                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => toggleBorder(index)}>
                                    <Image
                                        source={value.dogImg}
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