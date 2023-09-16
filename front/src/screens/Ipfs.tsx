import React, { useState } from "react";
import { Button, View, Text, Image } from "react-native";
import { NFT_STORAGE_KEY } from "@env";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
// import { NFTStorage } from "nft.storage";

const Ipfs = () => {
	const [imageUri, setImage] = useState<string | null>(null);

	const apiKey = process.env.NFT_STORAGE_KEY as string;
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
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
		console.log("result", result);
		console.log("test");
		console.log(imageUri);
	};

	const uploadIpfs = async (uri: any) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		const image = blob;
		const nft = {
			image,
			name: "nft1",
			description: "The metaverse is here. Where is it all being stored?",
			properties: {
				type: "blog-post",
				origins: {
					http: "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
					ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/",
				},
				authors: [{ name: "David Choi" }],
				content: {
					"text/markdown":
						"The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>",
				},
			},
		};

		// const client = new NFTStorage({ token: apiKey });
		// const metadata = await client.store(nft);

		// console.log("NFT data stored!");
		// console.log("Metadata URI: ", metadata.url);
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Pick an image from gallery" onPress={pickImage} />
			{imageUri && (
				<Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
			)}
			<Button title="upload to ipfs" onPress={() => uploadIpfs(imageUri)} />
		</View>
	);
};
export default Ipfs;
