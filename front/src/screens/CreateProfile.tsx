import {useState,useEffect} from "react"
import {View, Text, TextInput, Image, TouchableOpacity, Platform, Alert} from "react-native"
import ColorHeader from "../components/ColorHeader"
import CommonLayout from "../components/CommonLayout"
import Footer from "../components/Footer"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import * as SecureStore from 'expo-secure-store';
import {ethers} from "ethers"
import {mintDogTokenContract} from "../contracts/contract";
import * as ImagePicker from "expo-image-picker";
import axiosApi from "../utils/axios"
import axios from "axios"
import { Picker } from '@react-native-picker/picker';
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
    NFT_STORAGE_KEY,
    POLYGON_API_KEY,
} from "@env";
import RNFS from "react-native-fs";

import WalletLoading from "../components/WalletLoading"

import DatePickerIcon from "../../assets/images/date-picker-icon.png"
import AddPlusIcon from "../../assets/images/add-plus-icon.png"
import PhotoImg from "../../assets/images/photo-ex-img4.png"

import CreateProfileLayout from "../styles/createProfileLayout";

const CreateProfile = ({ navigation }: any) => {
	const [imageUri, setImageUri] = useState<any>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>();
    const [walletPrivateKey, setWalletPrivateKey] = useState<string>();
    const [petName, setPetName] = useState<string|null>();
    const [petSpecies, setPetSpecies] = useState<string|null>();
    const [petGender, setPetGender] = useState<string|null>('M');
    const [petBirth, setPetBirth] = useState<string|null>(new Date().getFullYear() + "-" + Number(new Date().getMonth()+1) + "-" + new Date().getDate());
    const [nftCid, setNftCid] = useState<string|null>();
    const [speciesList, setSpeciesList] = useState<any[]>([]);
    const [hashId, setHashId] = useState<any>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [tokenId, setTokenId] = useState<number>();
    const [imageOrigin, setImageOrigin] = useState<string>();
    const [myWalletAddress, setMyWalletAddress] = useState<string>();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

    const handleConfirm = async (date:string) => {
        const dateAll = new Date(date);
        const year = dateAll.getFullYear();
        let month = Number(dateAll.getMonth()+1);
        const day = dateAll.getDate();
        await setPetBirth(year+"-"+month+"-"+day);
        hideDatePicker();
    };

    // s3 클라이언트 초기화
	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

    const uploadImage = async (uri: any) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		const filename = await uri.split("/").pop();
		const type = await blob.type;
		const params = await {
			Bucket: AWS_BUCKET,
			Key: filename,
			Body: blob,
			ContentType: type,
		};
		await s3.upload(params, async (err: any, data: any) => {
			if (err) {
				console.log("err", err);
			} else {
                axios.post('http://10.0.2.2:3000/imageToServer',{
                    url: data.Location,
                }).then((data) => {
                    if(data.status === 200){
                        axios.post('http://10.0.2.2:3000/uploadIpfs',{
                            img: data.data,
                            petName: petName,
                            petSpecies: petSpecies,
                            petBirth: petBirth,
                            petGender: petGender,
                        }).then(async (data) => {
                            console.log("nftCid", data.data);
                            if(data.status === 200){
                                const tx = await mintDogTokenContract.mintDogProfile('0xDdc622a21B9aCCAE645cDeF23f07De884B2EC3D4', `ipfs://${nftCid}`);
                                const receipt = await tx.wait();
                                setHashId(receipt.hash);
                                console.log("receipt", receipt);

                                await axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0x0d695204afafc42acdf39dbf4bb58deea79895fb&address=${myWalletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${process.env.POLYGON_API_KEY}`).then((data) => {
                                    if(data.status === 200){
                                        setTokenId(data.data.result[data.data.result.length-1].tokenID);
                                    }
                                })
                                await axiosApi.post('/dog',{
                                    "dogName": petName,
                                    "dogBreed": petSpecies,
                                    "dogBirthDate": petBirth,
                                    "dogSex": petGender,
                                    "dogNft": tokenId, 
                                    "dogImg": imageOrigin,
                                }).then(async (data) => {
                                    console.log(data);
                                    await alert("프로필 생성이 완료되었습니다.");
                                    await navigation.navigate('Profile');
                                })
                            }
                        })
                    }
                });
            }
        })

	};

    const uploadIpfs = async () => {
        try{
            setIsLoading(true);
    
            await uploadImage(imageUri);
            
        }catch(err){
            console.error(err);
        }finally{
            await setIsLoading(false);
        }
    }

    // 권한 요청
	const getPermissionAsync = async () => {
		if (Platform.OS !== "web") {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				// 권한이 거부되었을 때 alert
				alert("Sorry, we need camera roll permissions to make this work!");
			}
		}
	};

	// 이미지 선택
	const pickImage = async () => {
		await getPermissionAsync(); // 권한 확인

		// 이미지 또는 동영상 선택 -> 당연히 비동기
		let result = await ImagePicker.launchImageLibraryAsync({
			// 일단 모든 타입 다 허용 동영상도 허용해뒀음
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			// 편집 가능하게
			allowsEditing: true,
			// 가로세로 비율
			aspect: [3, 3],
			// 0 ~ 1 사이의 숫자로 품질 나타냄
			quality: 1,
		});

		console.log("result", result);
		if(!result.canceled) {
            console.log("img", result.assets[0].uri);
			setImageUri(result.assets[0].uri);
        }
	};

	const createProfile = async () => {
		

    }

    useEffect(() => {
        const getWalletInfoFromStore = async () => {
            const walletAddress = await SecureStore.getItemAsync("walletAddress");
            if(walletAddress){
                setWalletAddress(walletAddress);
            }
            const privateKey = await SecureStore.getItemAsync("privateKey");
            if(privateKey){
                setWalletPrivateKey(privateKey);
            }
        }

        const getPetSpecies = async () => {
            axiosApi.get("/dog/breed").then((data) => {
                if(data.data.message === "견종 전체 목록 조회 완료"){
                    setSpeciesList(() => {
                        return data.data.data;
                    });
                }
            })
        }

        const getWalletAddress = async () => {
            const myWalletAddress = await SecureStore.getItemAsync("walletAddress");
            setMyWalletAddress(String(myWalletAddress));
        }


        getWalletInfoFromStore();
        getPetSpecies();
        getWalletAddress();
    },[])

    return(
        <>
            <CommonLayout>
                <ColorHeader title="프로필 작성"/>
                <View style={CreateProfileLayout.createProfileTitleWrap}>
                    <Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
                    <Text style={CreateProfileLayout.createProfileTitle}>
                        내 NFT에 저장하는,{"\n"}
                        나의 반려견
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                    <View style={CreateProfileLayout.imageUploadWrap}>
                        <Image
                            source={AddPlusIcon}
                        />
                        <Text>사진 등록하기</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    {imageUri && (
                        <Image source={{ uri: imageUri }} style={CreateProfileLayout.selectedImage}/>
                    )}
                </View>
                <View style={CreateProfileLayout.formWrap}>

                    <Text style={CreateProfileLayout.formTitle}>반려견의 이름을 입력해주세요.</Text>
                    <TextInput 
                        style={CreateProfileLayout.formInput}
                        onChangeText={(text) => setPetName(text)}
                        value={petName}
                    />
                    <Text style={CreateProfileLayout.formTitle}>반려견의 종을 입력해주세요.</Text>
                    <Picker
                        selectedValue = {petSpecies}
                        onValueChange = {(itemValue, itemIndex) => 
                            setPetSpecies(itemValue)
                        }
                        style={CreateProfileLayout.formInput}
                        >
                        {
                            speciesList.map((species: any, index:number) => {
                                return(
                                    <Picker.Item label={species.breedName} value={species.breedName} key={index}/>
                                );
                            })
                        }
                    </Picker>
                    <Text style={CreateProfileLayout.formTitle}>반려견의 성별을 입력해주세요.</Text>
                    <Picker
                        selectedValue = {petGender}
                        onValueChange = {(itemValue, itemIndex) => 
                            setPetGender(itemValue)
                        }
                        style={CreateProfileLayout.formInput}
                        >
                        <Picker.Item label = 'M' value = 'M' />
                        <Picker.Item label = 'F' value = 'F' />
                    </Picker>
                    <Text style={CreateProfileLayout.formTitle}>반려견의 생일을 입력해주세요.</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
                        <View style={CreateProfileLayout.dateFormWrap}>
                            <Image
                                source={DatePickerIcon}
                            />
                            <Text style={CreateProfileLayout.dateFormText}>{petBirth}</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                </View>

                <View style={CreateProfileLayout.formButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {uploadIpfs()}}>
                        <View style={CreateProfileLayout.submitButton}>
                            <Text style={CreateProfileLayout.submitButtonText}>
                                앨범 등록하기
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
                        <View style={CreateProfileLayout.cancelButton}>
                            <Text style={CreateProfileLayout.cancelButtonText}>
                                취소하기
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/> 
            </CommonLayout>
            {
                isLoading?
                <WalletLoading title="프로필 생성중.. 잠시만 기다려주세요."/>
                :
                <></>
            }
        </>
    );
}

export default CreateProfile;