import React, { useState } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { S3 } from "aws-sdk";
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
} from "@env";

const Album = () => {
  // img uri 저장
  const [imageUri, setImage] = useState<string | null>(null);

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="upload to s3" onPress={() => uploadImage(imageUri)} />
    </View>
  );
};

export default Album;
