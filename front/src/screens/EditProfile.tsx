import {useState,useEffect} from "react"
import {View, Text, TextInput, Image, TouchableOpacity} from "react-native"
import ColorHeader from "../components/ColorHeader"
import CommonLayout from "../components/CommonLayout"
import Footer from "../components/Footer"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import * as SecureStore from 'expo-secure-store';

import axios from "../utils/axios"

import DatePickerIcon from "../../assets/images/date-picker-icon.png"
import AddPlusIcon from "../../assets/images/add-plus-icon.png"

import CreateProfileLayout from "../styles/createProfileLayout"

const EditProfile = ({navigation, route} : any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDog, setSelectedDog] = useState<Object>();
    const [myWalletAddress, setMyWalletAddress] = useState<String>();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date:string) => {
        console.warn("사용자가 선택한 날짜: ", date);
        hideDatePicker();
    };

    useEffect(() => {
        const selectedNo = route.params.selectedNo;

        axios.get(`/dog/${selectedNo}`).then((data) => {
            if(data.status === 200){
                setSelectedDog(data.data.data);
            }
        })

        const getAddress = async () => {
            const address = await SecureStore.getItemAsync("walletAddress");
            setMyWalletAddress(String(address));
        }

        getAddress();
    }, [])
    return(
        <>
            <CommonLayout>
                <ColorHeader title="반려견 상세보기"/>
                <View style={CreateProfileLayout.createProfileTitleWrap}>
                    <Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
                    <Text style={CreateProfileLayout.createProfileTitle}>
                        내 NFT에 저장하는,{"\n"}
                        나의 반려견
                    </Text>
                </View>
                {
                    selectedDog?.dogImg ?
                    <Image
                        source={{uri: selectedDog?.dogImg}}
                        style={CreateProfileLayout.editShowDogImg}
                    />
                    :
                    <></>
                }

                <View style={CreateProfileLayout.formWrap}>

                    <Text style={CreateProfileLayout.formTitle}>반려견의 이름을 입력해주세요.</Text>
                    <TextInput
                        style={CreateProfileLayout.formInput}
                        value={selectedDog?.dogName}    
                    />
                    <Text style={CreateProfileLayout.formTitle}>반려견의 종을 입력해주세요.</Text>
                    <TextInput
                        style={CreateProfileLayout.formInput}
                        value={selectedDog?.dogBreed}
                    />
                    <Text style={CreateProfileLayout.formTitle}>반려견의 성별을 입력해주세요.</Text>
                    <TextInput 
                        style={CreateProfileLayout.formInput}
                        value={selectedDog?.dogSex}
                    />
                    <Text style={CreateProfileLayout.formTitle}>반려견의 생일을 입력해주세요.</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
                        <View style={CreateProfileLayout.dateFormWrap}>
                            <Image
                                source={DatePickerIcon}
                            />
                            <Text style={CreateProfileLayout.dateFormText}>{selectedDog?.dogBirthDate}</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={CreateProfileLayout.formTitle}>내 지갑의 주소입니다.</Text>
                    <TextInput
                        style={CreateProfileLayout.formInput}
                        value={myWalletAddress}
                    />
                    <Text style={CreateProfileLayout.formTitle}>내 반려견의 token id입니다.</Text>
                    <TextInput
                        style={CreateProfileLayout.formInput}
                        value={String(selectedDog?.dogNft)}
                    />
                </View>

                <View style={CreateProfileLayout.formButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
                        <View style={CreateProfileLayout.submitButton}>
                            <Text style={CreateProfileLayout.submitButtonText}>
                                목록보기
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default EditProfile;