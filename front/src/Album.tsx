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
  const [imageUri, setImage] = useState<string | null>(null);

  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

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
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("data", data);
      }
    });
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    await getPermissionAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
