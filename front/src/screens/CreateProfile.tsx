import { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	Platform,
	Alert,
} from "react-native";
import ColorHeader from "../components/ColorHeader";
import CommonLayout from "../components/CommonLayout";
import Footer from "../components/Footer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as SecureStore from "expo-secure-store";
import { ethers, Transaction } from "ethers";
import { mintDogTokenContract } from "../contracts/index";
import * as ImagePicker from "expo-image-picker";
import { NFT_STORAGE_KEY } from "@env";
import axiosApi from "../utils/axios";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
} from "@env";

import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";

import CreateProfileLayout from "../styles/createProfileLayout";

const CreateProfile = ({ navigation }: any) => {
	const [imageUri, setImageUri] = useState<any>(null);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string>();
	const [walletPrivateKey, setWalletPrivateKey] = useState<string>();
	const [imageCid, setImageCid] = useState<any>();
	const [petName, setPetName] = useState<string | null>();
	const [petSpecies, setPetSpecies] = useState<string | null>();
	const [petGender, setPetGender] = useState<string | null>("M");
	const [petBirth, setPetBirth] = useState<string | null>();
	const [nftCid, setNftCid] = useState<string | null>();
	const [speciesList, setSpeciesList] = useState<any>();

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = async (date: string) => {
		const dateAll = new Date(date);
		const year = dateAll.getFullYear();
		const month = dateAll.getMonth();
		const day = dateAll.getDate();
		await setPetBirth(year + "-" + month + "-" + day);
		hideDatePicker();
	};

	const getImage = async () => {
		return await imageUri;
	};

	// s3 클라이언트 초기화
	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	// 이미지 업로드
	const uploadImage = async (uri: any) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		const filename = uri.split("/").pop();
		const type = blob.type;
		const params = {
			Bucket: AWS_BUCKET,
			Key: filename,
			Body: blob,
			ContentType: type,
		};
		s3.upload(params, async (err: any, data: any) => {
			if (err) {
				console.log("err", err);
			} else {
				const reader = new FileReader();
				const blob = await new Blob(['<img src="', data.Location, '" />'], {
					type: "text/html",
				});
				reader.readAsDataURL(blob);
				reader.onload = () => {
					const base64data = reader.result;
					setImageCid(base64data);
				};
			}
		});
	};

	const uploadIpfs = async () => {
		await uploadImage(imageUri);

		const nft_storage_url = "https://api.nft.storage/upload";
		const blobImg = await getImage();
		await axios
			.post(nft_storage_url, blobImg, {
				headers: {
					Authorization: `Bearer ${process.env.NFT_STORAGE_KEY}`,
					"Content-Type": "application/octet-stream",
				},
			})
			.then((res) => {
				console.log("ImageCid", res.data);
			})
			.catch((err) => {
				console.error(err);
			});

		await uploadMetaJSON();

		await createProfile();
	};

	const uploadMetaJSON = async () => {
		const nft_storage_url = "https://api.nft.storage/upload";
		const metaData = {
			dogName: petName,
			dogBirthDate: petBirth,
			dogBreed: petSpecies,
			dogSex: petGender,
			imageCID: imageCid,
		};

		console.log("metadata", metaData);
		await axios
			.post(nft_storage_url, metaData, {
				headers: {
					Authorization: `Bearer ${process.env.NFT_STORAGE_KEY}`,
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log("nftCid", res.data.value.cid);
				setNftCid(res.data.value.cid);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
		if (!result.canceled) {
			console.log("img", result.assets[0].uri);
			const buffer = new Blob([result.assets[0].uri], { type: "image/**" });
			console.log("buffer", buffer);
			setImageUri(result.assets[0].uri);
		}
	};

	const createProfile = async () => {
		// const walletAddress = await SecureStore.getItemAsync("walletAddress");
		// const walletPrivateKey = await SecureStore.getItemAsync("walletPrivateKey");

		const provider = await new ethers.JsonRpcProvider(process.env.RPC_URL);

		const privateKey = process.env.ADMIN_WALLET_PRIVATE_KEY;
		const gasPriceGwei = "0.00001";
		const priceWei = ethers.parseUnits(gasPriceGwei, "gwei");

		const response = await mintDogTokenContract.mintDogProfile(
			"0xD9C645DBE4F116080E716614B82eBE341e554Eb5",
			`ipfs://${nftCid}`,
		);
		console.log("response", response);
	};

	useEffect(() => {
		const getWalletInfoFromStore = async () => {
			const walletAddress = await SecureStore.getItemAsync("walletAddress");
			if (walletAddress) {
				setWalletAddress(walletAddress);
			}
			const privateKey = await SecureStore.getItemAsync("privateKey");
			if (privateKey) {
				setWalletPrivateKey(privateKey);
			}
		};

		const getPetSpecies = async () => {
			axiosApi.get("/dog/breed").then((data) => {
				// if(data.data.message === "견종 전체 목록 조회 완료"){
				//     setSpeciesList(data.data.data);
				// }
			});
		};

		getWalletInfoFromStore();
		getPetSpecies();
	}, []);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="프로필 작성" />
				<View style={CreateProfileLayout.createProfileTitleWrap}>
					<Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
					<Text style={CreateProfileLayout.createProfileTitle}>
						내 NFT에 저장하는,{"\n"}
						나의 반려견
					</Text>
				</View>
				<TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
					<View style={CreateProfileLayout.imageUploadWrap}>
						<Image source={AddPlusIcon} />
						<Text>사진 등록하기</Text>
					</View>
				</TouchableOpacity>
				<View>
					{imageUri && (
						<Image
							source={{ uri: imageUri }}
							style={CreateProfileLayout.selectedImage}
						/>
					)}
				</View>
				<View style={CreateProfileLayout.formWrap}>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 이름을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						onChangeText={(text) => setPetName(text)}
						value={petName}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 종을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						onChangeText={(text) => setPetSpecies(text)}
						value={petSpecies}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 성별을 입력해주세요.
					</Text>
					<Picker
						selectedValue={petGender}
						onValueChange={(itemValue, itemIndex) => setPetGender(itemValue)}
						style={CreateProfileLayout.formInput}
					>
						<Picker.Item label="M" value="M" />
						<Picker.Item label="F" value="F" />
					</Picker>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 생일을 입력해주세요.
					</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
						<View style={CreateProfileLayout.dateFormWrap}>
							<Image source={DatePickerIcon} />
							<Text style={CreateProfileLayout.dateFormText}>
								2023. 09. 04.
							</Text>
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
					<TouchableOpacity activeOpacity={0.7} onPress={uploadIpfs}>
						<View style={CreateProfileLayout.submitButton}>
							<Text style={CreateProfileLayout.submitButtonText}>
								앨범 등록하기
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("Profile")}
					>
						<View style={CreateProfileLayout.cancelButton}>
							<Text style={CreateProfileLayout.cancelButtonText}>취소하기</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Footer />
			</CommonLayout>
		</>
	);
};

export default CreateProfile;
