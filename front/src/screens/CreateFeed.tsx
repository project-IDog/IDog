import React, {useState} from "react"
import {View,Text,Image,TextInput,TouchableOpacity,Button,Platform} from "react-native"
import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import * as SecureStore from 'expo-secure-store';

import * as ImagePicker from "expo-image-picker";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
} from "@env";
import axios from "../utils/axios"

import AddPlusIcon from "../../assets/images/add-plus-icon.png"

import CreateFeedLayout from "../styles/createFeedLayout";

const CreateFeed = ({navigation, route}: any) => {
	const selectedId = route.params.selectedId;
    // img uri 저장
	const [imageUri, setImage] = useState<string | null>(null);
	const [comment, setComment] = useState<string | null>(null);

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
		console.log("params", params);
		s3.upload(params, (err: any, data: any) => {
			if (err) {
				console.log("err", err);
			} else {
				console.log("data", data);
			}
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
			aspect: [4, 3],
			// 0 ~ 1 사이의 숫자로 품질 나타냄
			quality: 1,
		});
		console.log("result", result);
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

    const submitFeed = () => {
		console.log(SecureStore.getItemAsync("accessToken"));
		console.log(imageUri);
        uploadImage(imageUri);

		axios.post('/photo', {
			dogNo:13,
			photoUrl:imageUri,
			photoComment:comment,
			photoIsGoat:false,
		}).then((data) => {
			if(data.data.message === "사진 등록 완료"){
				alert("앨범 등록이 완료되었습니다.");
				navigation.replace('Album');
			}
		})
    }

    return(
        <>
            <CommonLayout>
                <ColorHeader title="앨범등록"/>
                <View style={CreateFeedLayout.createTitle}>
                    <Text style={CreateFeedLayout.createTitleDesc}>반려견 포토앨범</Text>
                    <Text style={CreateFeedLayout.createMainTitle}>
                        내 피드에 저장하는,{"\n"}
                        나의 반려견
                    </Text>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                    <View style={CreateFeedLayout.photoUploadWrap}>
                        <Image
                            source={AddPlusIcon}
                        />
                        <Text>사진 등록하기</Text>
                    </View>
                </TouchableOpacity>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={CreateFeedLayout.imageOnLayout}/>
                )}
                <View>
                    <TextInput
                        style={CreateFeedLayout.createDescWrap}
						value={comment}
                        placeholder="문구 입력..."
						onChangeText={(text) => setComment(text)}
                    />
                </View>

                <View style={CreateFeedLayout.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={submitFeed}>
                        <View style={CreateFeedLayout.submitButton}>
                            <Text style={CreateFeedLayout.submitButtonText}>앨범 등록하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Album')}>
                        <View style={CreateFeedLayout.cancelButton}>
                            <Text style={CreateFeedLayout.cancelButtonText}>취소하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    )
}

export default CreateFeed;