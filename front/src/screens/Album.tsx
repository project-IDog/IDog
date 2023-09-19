import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Text,
	TouchableOpacity,
} from "react-native";

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import StatusCommentModal from "../components/StatusCommentModal";
import axios from "../utils/axios";

import GrayPenIcon from "../../assets/images/gray-pen-icon.png";
import MyPetPhoto from "../../assets/images/mypage-thumbnail-img.png";
import NewFeedIcon from "../../assets/images/new-feed-icon.png";
import PhotoImg1 from "../../assets/images/photo-ex-img1.png";
import PhotoImg2 from "../../assets/images/photo-ex-img2.png";
import PhotoImg3 from "../../assets/images/photo-ex-img3.png";
import PhotoImg4 from "../../assets/images/photo-ex-img4.png";
import PhotoImg5 from "../../assets/images/photo-ex-img5.png";
import PhotoImg6 from "../../assets/images/photo-ex-img6.png";

import AlbumLayout from "../styles/albumLayout";

const Album = ({ navigation }: any) => {
	const [statusModalState, setStatusModalState] = useState<Boolean>(false);
	const [feedList, setFeedList] = useState<Object[]>([
		{
			url: Image.resolveAssetSource(PhotoImg1),
		},
		{
			url: Image.resolveAssetSource(PhotoImg2),
		},
		{
			url: Image.resolveAssetSource(PhotoImg3),
		},
		{
			url: Image.resolveAssetSource(PhotoImg4),
		},
		{
			url: Image.resolveAssetSource(PhotoImg5),
		},
		{
			url: Image.resolveAssetSource(PhotoImg6),
		},
		{
			url: Image.resolveAssetSource(PhotoImg1),
		},
		{
			url: Image.resolveAssetSource(PhotoImg2),
		},
		{
			url: Image.resolveAssetSource(PhotoImg3),
		},
	]);

	const [feedActiveState, setFeedActiveState] = useState<Boolean>(false);
	const [albumActiveState, setAlbumActiveState] = useState<Boolean>(true);

	const toggleFeedState = () => {
		switch (feedActiveState) {
			case true:
				setFeedActiveState(false);
				setAlbumActiveState(true);
				break;
			case false:
				setFeedActiveState(true);
				setAlbumActiveState(false);
				break;
		}
	};

	const toggleAlbumState = () => {
		switch (albumActiveState) {
			case true:
				setFeedActiveState(true);
				setAlbumActiveState(false);
				break;
			case false:
				setFeedActiveState(false);
				setAlbumActiveState(true);
				break;
		}
	};

	const updateActiveStatusModal = (status: Boolean) => {
		setStatusModalState(status);
	};

	useEffect(() => {
        axios.get('/photo/user/0').then((data) => {
			console.log("data",data);
		})
    }, []);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="포토앨범" />
				<View>
					<View style={AlbumLayout.profileWrap}>
						<Text style={AlbumLayout.myNameTitle}>나의 닉네임</Text>
						<Image source={MyPetPhoto} style={AlbumLayout.userPhoto} />
					</View>
					<View style={AlbumLayout.newFeedWrap}>
						<TouchableOpacity
							activeOpacity={0.7}
							style={AlbumLayout.newFeedFlexWrap}
							onPress={() => navigation.navigate("ChoiceDog")}
						>
							<View style={AlbumLayout.newFeedIconWrap}>
								<Image source={NewFeedIcon} />
							</View>
							<Text style={AlbumLayout.newFeedText}>새로운 피드</Text>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => updateActiveStatusModal(true)}
				>
					<View style={AlbumLayout.statusMessageWrap}>
						<Image source={GrayPenIcon} />
						<Text style={AlbumLayout.statusMessageText}>
							상태메시지 적을 공간 할 말 적기
						</Text>
					</View>
				</TouchableOpacity>

				<View style={AlbumLayout.albumNav}>
					<TouchableOpacity activeOpacity={0.7} onPress={toggleFeedState}>
						{feedActiveState ? (
							<Text
								style={[AlbumLayout.albumNavText, AlbumLayout.activeAlbumNav]}
							>
								Feed
							</Text>
						) : (
							<Text style={AlbumLayout.albumNavText}>Feed</Text>
						)}
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.7} onPress={toggleAlbumState}>
						{albumActiveState ? (
							<Text
								style={[AlbumLayout.albumNavText, AlbumLayout.activeAlbumNav]}
							>
								Album
							</Text>
						) : (
							<Text style={[AlbumLayout.albumNavText]}>Album</Text>
						)}
					</TouchableOpacity>
				</View>

				<View style={AlbumLayout.photoList}>
					{feedList.map((value: any, index: number) => {
						return (
							<TouchableOpacity
								activeOpacity={0.7}
								key={index}
								onPress={() =>
									navigation.push("DetailFeed", { selectImg: value.url })
								}
							>
								<Image source={value.url} style={AlbumLayout.photoItem} />
							</TouchableOpacity>
						);
					})}
				</View>
				<View style={{ marginTop: 6 }}></View>
				<Footer />
				{statusModalState ? (
					<StatusCommentModal
						updateActiveStatusModal={updateActiveStatusModal}
					/>
				) : (
					<></>
				)}
			</CommonLayout>
		</>
		
	);
};

export default Album;
