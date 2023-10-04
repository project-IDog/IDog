import {useState,useEffect} from "react"
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity} from "react-native"
import CommonLayout from "../components/CommonLayout";
import WhiteHeader from "../components/WhiteHeader";
import SubMain from "../components/SubMain";
import Footer from "../components/Footer";
import {mintDogTokenContract, mintIDogTokenAddress,mintIDogTokenAbi} from "../contracts/contract"
import {ethers} from "ethers"
import {CLIENT_PRIVATE_KEY, MINT_DOG_TOKEN_ADDRESS} from "@env"
import * as SecureStore from "expo-secure-store";

import axios from "../utils/axios";

import AdoptionMainImg from "../../assets/images/adoption-main-img.png"
import MyPetThumbnail1 from "../../assets/images/my-pet-thumbnail1.png"
import MyPetThumnail2 from "../../assets/images/my-pet-thumbnail2.png"

import AdoptionLayout from "../styles/adptionLayout";

const Adoption = ({navigation}: any) => {
    const [myPetPressState, setMyPetPressState] = useState({});
    const [myPetList, setMyPetList] = useState<any>();
    const [selectedDogNo, setSelectedDogNo] = useState<number>();
    const [toAddress, setToAddress] = useState<string>();
    const [tokenId, setTokenId] = useState<number>(0);
    const [walletAddress, setWalletAddress] = useState<string>();

    const toggleBorder = (index:number, selectedDogNo:number) => {
        setSelectedDogNo(selectedDogNo);
    }

    const submitAdoption = async () => {
        console.log(selectedDogNo);
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        //const fromPrivateKey = String(CLIENT_PRIVATE_KEY) //입양 보내는 사람의 개인키
        const fromPrivateKey = await String(SecureStore.getItemAsync("privateKey"));
        const polygonApiKey = process.env.POLYGON_API_KEY; 
        const gasPriceGwei = "0.001";
        const gasPriceWei = ethers.parseUnits(gasPriceGwei, 'gwei');

        const signerInstance = new ethers.Wallet(fromPrivateKey, provider); //(tokenId 즉 NFT 소유주의 개인키로 서명한 지갑 가져오기)
        const fromAdrress = String(signerInstance.address);
        const contract = new ethers.Contract(String(mintIDogTokenAddress), mintIDogTokenAbi, signerInstance);

        await axios.get(`https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${String(MINT_DOG_TOKEN_ADDRESS)}&address=${fromAdrress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${polygonApiKey}`).then((data) => {
            console.log("!!data", data.data.result[data.data.result.length-1].tokenID);
            setTokenId(() => {
                return data.data.result[data.data.result.length-1].tokenID;
            });
        })

        try {
            const approvalTransaction = await contract.setApprovalForAll(String(mintIDogTokenAddress), true); //승인받기 
            console.log(approvalTransaction);
            console.log("Approval granted to the contract:", String(mintIDogTokenAddress));

            const transferTransaction = await contract.safeTransferFrom(signerInstance.address, toAddress, tokenId); //from, to, tokenId
            console.log(transferTransaction);
            console.log("NFT transferred to:", toAddress);
            await alert("나의 반려견의 입양신청이 완료되었습니다.");
        } catch (error) {
            alert("입양신청이 실패하였습니다, 관리자에게 문의하세요.");
            console.error(error);
        }

    }

    useEffect(() => {
        console.log("selectedDogNo", selectedDogNo);
        axios.get("/dog/list").then((data) => {
            if(data.data.message === "사용자의 모든 강아지 목록 조회 완료"){
                setMyPetList(data.data.data);
            }
        })

        const getMyAddress = async () => {
            const walletAddress = await SecureStore.getItemAsync("walletAddress");
			if (walletAddress) {
				setWalletAddress(walletAddress);
			}
        }

        getMyAddress();
    }, [tokenId, toAddress]);

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
                        myPetList?.map((petItem: any, index: number) => {
                            console.log(petItem);
                            if(petItem.dogNo === selectedDogNo){
                                return(
                                    <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => toggleBorder(index, petItem.dogNo)}>
                                        <Image
                                            source={{uri: petItem.dogImg}}
                                            style={[
                                                AdoptionLayout.myPetThumbnail,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                );
                            }
                            return(
                                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => toggleBorder(index, petItem.dogNo)}>
                                    <Image
                                        source={{uri: petItem.dogImg}}
                                        style={[
                                            AdoptionLayout.myPetThumbnaulDisable,
                                        ]}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <View style={AdoptionLayout.adoptionFormWrap}>

                    <Text style={AdoptionLayout.adoptionFormTitle}>전달할 사람의 닉네임을 입력해주세요.</Text>
                    <TextInput
                        style={AdoptionLayout.adoptionFormInput}
                        value={toAddress}
                        onChangeText={(text) => setToAddress(text)}    
                    />

                    <Text style={AdoptionLayout.adoptionFormTitle}>내 반려견을 떠나보내며 한마디를 입력해주세요.</Text>
                    <TextInput style={AdoptionLayout.adoptionFormInput}></TextInput>
                
                </View>

                <View style={AdoptionLayout.adoptionButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7} style={AdoptionLayout.submitButton} onPress={() => submitAdoption()}>
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