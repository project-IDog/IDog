import React, { useState } from "react";
import { Image, View, Platform, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { S3 } from "aws-sdk";
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
} from "@env";

import CommonLayout from "../components/CommonLayout"
import ColorHeader from "../components/ColorHeader"
import Footer from "../components/Footer";
import StatusCommentModal from "../components/StatusCommentModal";

import GrayPenIcon from "../../assets/images/gray-pen-icon.png"
import MyPetPhoto from "../../assets/images/mypage-thumbnail-img.png"
import NewFeedIcon from "../../assets/images/new-feed-icon.png"
import PhotoImg1 from "../../assets/images/photo-ex-img1.png"
import PhotoImg2 from "../../assets/images/photo-ex-img2.png"
import PhotoImg3 from "../../assets/images/photo-ex-img3.png"
import PhotoImg4 from "../../assets/images/photo-ex-img4.png"
import PhotoImg5 from "../../assets/images/photo-ex-img5.png"
import PhotoImg6 from "../../assets/images/photo-ex-img6.png"

import AlbumLayout from "../styles/albumLayout";

const Album = ({navigation} : any) => {
  // img uri 저장
  const [imageUri, setImage] = useState<string | null>(null);
  const [statusModalState, setStatusModalState] = useState<Boolean>(false);
  const [feedList, setFeedList] = useState<Object[]>([{
    url: Image.resolveAssetSource(PhotoImg1),
  },{
    url: Image.resolveAssetSource(PhotoImg2),
  },{
    url: Image.resolveAssetSource(PhotoImg3),
  },{
    url: Image.resolveAssetSource(PhotoImg4),
  },{
    url: Image.resolveAssetSource(PhotoImg5),
  },{
    url: Image.resolveAssetSource(PhotoImg6),
  },{
    url: Image.resolveAssetSource(PhotoImg1),
  },{
    url: Image.resolveAssetSource(PhotoImg2),
  },{
    url: Image.resolveAssetSource(PhotoImg3),
  },]);

  const [feedActiveState, setFeedActiveState] = useState<Boolean>(false);
  const [albumActiveState, setAlbumActiveState] = useState<Boolean>(true);

  const toggleFeedState = () => {
    switch(feedActiveState){
      case true:
        setFeedActiveState(false);
        setAlbumActiveState(true);
        break;
      case false:
        setFeedActiveState(true);
        setAlbumActiveState(false);
        break;
    }
  }

  const toggleAlbumState = () => {
    switch(albumActiveState){
      case true:
        setFeedActiveState(true);
        setAlbumActiveState(false);
        break;
      case false:
        setFeedActiveState(false);
        setAlbumActiveState(true);
        break;
    }
  }

  const updateActiveStatusModal = (status: Boolean) => {
    setStatusModalState(status);
  }

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
    <>
      <CommonLayout>
        <ColorHeader title="포토앨범"/>
        <View >
          <View style={AlbumLayout.profileWrap}>
            <Text style={AlbumLayout.myNameTitle}>나의 닉네임</Text>
            <Image
              source={MyPetPhoto}
              style={AlbumLayout.userPhoto}
            />
          </View>
          <View style={AlbumLayout.newFeedWrap}>
            <TouchableOpacity activeOpacity={0.7} style={AlbumLayout.newFeedFlexWrap} onPress={() => navigation.navigate('CreateFeed')}>
              <View style={AlbumLayout.newFeedIconWrap}>
                <Image
                  source={NewFeedIcon}
                />
              </View>
              <Text style={AlbumLayout.newFeedText}>새로운 피드</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity activeOpacity={0.7} onPress={() => updateActiveStatusModal(true)}>
          <View style={AlbumLayout.statusMessageWrap}>
            <Image
              source={GrayPenIcon}
            />
            <Text style={AlbumLayout.statusMessageText}>상태메시지 적을 공간 할 말 적기</Text>
          </View>
        </TouchableOpacity>

        <View style={AlbumLayout.albumNav}>
          <TouchableOpacity activeOpacity={0.7} onPress={toggleFeedState}>
            {
              feedActiveState ?
              <Text style={[AlbumLayout.albumNavText, AlbumLayout.activeAlbumNav]}>Feed</Text>
              :
              <Text style={AlbumLayout.albumNavText}>Feed</Text>
            }
            
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={toggleAlbumState}>
            {
              albumActiveState ?
              <Text style={[AlbumLayout.albumNavText, AlbumLayout.activeAlbumNav]}>Album</Text>
              :
              <Text style={[AlbumLayout.albumNavText]}>Album</Text>

            }
            
          </TouchableOpacity>
        </View>

        <View style={AlbumLayout.photoList}>
          {
            feedList.map((value : any, index : number) => {
              return(
                <TouchableOpacity activeOpacity={0.7} key={index} onPress={() => navigation.push('DetailFeed', {selectImg: value.url})}>
                  <Image
                    source={value.url}
                    style={AlbumLayout.photoItem}
                  />
                </TouchableOpacity>
              )
            })
          }

        </View>
        <View style={{marginTop:6}}></View>
        <Footer/>
        {
          statusModalState ?
          <StatusCommentModal updateActiveStatusModal={updateActiveStatusModal}/>
          :
          <></>
        }
      </CommonLayout>
      
    </>
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Button title="Pick an image from gallery" onPress={pickImage} />
    //   {imageUri && (
    //     <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    //   )}
    //   <Button title="upload to s3" onPress={() => uploadImage(imageUri)} />
    // </View>
  );
};

export default Album;
