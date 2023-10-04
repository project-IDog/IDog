import react, { useRef, useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
	ScrollView,
	TextInput,
	Alert,
	Modal,
} from "react-native";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import MemorialParkLayout from "../styles/MemorialParkLayout";
import MpImage from "../../assets/images/MpImg.jpg";
import SubMainRip from "../components/SubMainRip";
import MemorialParkLoading from "./MemorialParkLoading";
import axios from "../utils/axios";
import MemorialParkDesignLayout from "../styles/MemorialParkDesignLayout";
import { responsiveWidth } from "react-native-responsive-dimensions";
import LoginStore from "../stores/LoginStore";
import Login from "./Login";

const MemorialPark: React.FC<any> = ({ navigation, route }) => {
	const { data } = route.params;
	const loadingOpacity = useRef(new Animated.Value(1)).current;
	const [isSkipped, setIsSkipped] = useState(false);
	const [isFullyTransparent, setIsFullyTransparent] = useState(false);
	const [scrollenable, setScrollenable] = useState(false);
	const [commentList, setCommentList] = useState<Object[]>([]);
	const [showAllComments, setShowAllComments] = useState(false);
	const [comment, setComment] = useState("");
	const [feedList, setFeedList] = useState<Object[]>([]);
	const [showAllFeeds, setShowAllFeeds] = useState(false);
	const [confirmationModalVisible, setConfirmationModalVisible] =
		useState(false);

	const [selectedCommentNo, setSelectedCommentNo] = useState<number | null>(
		null,
	);
	

	const [uesrInfo, setUserInfo] = useState<Object[]>([]);

	const getUserInfo = () => {
		axios.get("/user").then((data) => {
			setUserInfo(data.data.data);
		});
	};

	useEffect(() => {
		getUserInfo();

		console.log("데이터 받았니??:",data);
	}, []);

	const fetchComments = () => {
		axios.get(`/comment/${data.graveNo}`).then((response) => {
			if (response.data.message === "추모 댓글 조회 성공") {
				setCommentList(response.data.data);
			}
		});
	};

	const commentSubmit = () => {
		if (!comment.trim()) {
			alert("댓글을 입력해주세요.");
			return;
		}
		axios
			.post("/comment", {
				graveNo: data.graveNo, // 이거 나중에 +2 제거해야 함
				commentContent: comment,
			})
			.then((data) => {
				if (data.data.message === "추모 댓글 등록 완료") {
					Alert.alert("Memorial Park", "댓글 등록이 완료되었습니다.");

					setComment("");
					fetchComments();
				}
			});
	};

	useEffect(() => {
		axios.get(`/comment/${data.graveNo}`).then((data) => {
			if (data.data.message === "추모 댓글 조회 성공") {
				setCommentList(data.data.data);
			}
		});

		setTimeout(() => {
			Animated.parallel([
				Animated.timing(loadingOpacity, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
			]).start();
		}, 7500);
	}, []);

	useEffect(() => {
		if (isSkipped) {
			Animated.parallel([
				Animated.timing(loadingOpacity, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [isSkipped]);

	useEffect(() => {
		const listener = loadingOpacity.addListener(({ value }) => {
			setIsFullyTransparent(value === 0);
			setScrollenable(true);
		});

		return () => {
			loadingOpacity.removeListener(listener);
		};
	}, []);

	useEffect(() => {
		axios.get("/photo/user").then((data) => {
			if (data.data.message === "사진 조회 성공") {
				setFeedList(data.data.data);
			}
		});
	}, []);

	const Pickpicture = (value: any) => () => {
		navigation.push("DetailFeed", {
			selectImg: { uri: value.photoUrl },
			comment: value.photoComment,
			photoNo: value.photoNo,
		});
	};

	const imageUrl: string | null = data?.dogImg ? data.dogImg : null;

	const handleConfirm = () => {
		axios
			.delete(`/comment/${selectedCommentNo}`)
			.then((data) => {
				if (data.data.message === "추모 댓글 삭제 성공") {
					setConfirmationModalVisible(false);
					fetchComments();
					Alert.alert(
						"추모 공원",
						"댓글을 삭제했습니다.",
						[
							{
								text: "OK",
								onPress: () => setConfirmationModalVisible(false),
							},
						],
						{ cancelable: false },
					);
				}
			})
			.catch((error) => {
				console.error("Error occurred during axios request:", error.response);
			});
	};

	const handleCancel = () => {
		setConfirmationModalVisible(false);
	};

	return (
		<>
			<ScrollView scrollEnabled={scrollenable}>
				<Animated.View
					style={[MemorialParkLayout.Mpbackground, { opacity: loadingOpacity }]}
					pointerEvents={isFullyTransparent ? "none" : "auto"}
				>
					<MemorialParkLoading
						isSkipped={isSkipped}
						setIsSkipped={setIsSkipped}
					/>
				</Animated.View>
				<MainHeader />
				<SubMainRip
					subTitle="추모공원"
					mainTitle={`반려견에게 영원한 평화와 \n행복을 기원합니다.`}
					bgImg={MpImage}
					desc="추모하기"
					data={data}
				/>
				<View style={MemorialParkLayout.MpTitleWrap}>
					<Text style={MemorialParkLayout.MpDesc}>Memorial Park</Text>
					<Text style={MemorialParkLayout.MpTitle}>
						추억이 모아진 반려견의
						{"\n"}
						NFT를 확인해보세요
					</Text>
				</View>
				<View style={[MemorialParkLayout.mpTitlewrap]}>
					<View style={[MemorialParkLayout.mpMarginwrap]}>
						<Text style={[MemorialParkLayout.mpTitle]}>RIP 반려견 프로필</Text>
						<View style={[MemorialParkLayout.mpBtw]}>
							<Image
								source={{ uri: imageUrl }}
								style={[MemorialParkLayout.tabImage]}
							/>
							<View style={[MemorialParkLayout.mpCol]}>
								<View style={[MemorialParkLayout.mpBtw]}>
									<Text style={[MemorialParkLayout.mpTitle]}>
										{data.dogName}
									</Text>
									<Text style={[MemorialParkLayout.mpTitle]}>
										{data.dogBreed}
									</Text>
								</View>
								<View>
									<Text style={[MemorialParkLayout.mpDate]}>
										{data.dogBirthDate}~{data.dogDeathDate}
									</Text>
								</View>
								<View style={[MemorialParkLayout.mpBtw]}>
									<Text
										style={[
											MemorialParkLayout.mpTitle,
											{ color: "blue", fontWeight: "900" },
										]}
									>
										{data.dogSex}
									</Text>
									<Text style={[MemorialParkLayout.mpTitle]}>
										Memorial 앨범
									</Text>
								</View>
								<View style={[MemorialParkLayout.mpBtw2]}>
									{feedList.slice(0, 3).map((value: any, index: number) => {
										return (
											<Image
												key={index}
												source={{ uri: value.photoUrl }}
												style={[MemorialParkLayout.tabImage2]}
											/>
										);
									})}
								</View>
							</View>
						</View>
					</View>
				</View>
				<View style={[MemorialParkLayout.mpTitlewrap2]}>
					<Text style={MemorialParkLayout.MpDesc}>Comment</Text>
					<Text style={[MemorialParkLayout.MpTitle]}>
						반려견에게 하고 {"\n"}싶었던 말을 남겨보세요
					</Text>
				</View>
				<View style={[MemorialParkLayout.mpTitlewrap3]}>
					{LoginStore.isLogged ? (
						<View style={[MemorialParkLayout.mpMarginwrap]}>
							<Text style={[MemorialParkLayout.mpTitle]}>댓글 작성하기</Text>
							<View style={MemorialParkLayout.commentcontainer}>
								<TextInput
									style={[MemorialParkLayout.commentInput]}
									value={comment}
									onChangeText={setComment}
									placeholder="추모의 댓글을 작성할 수 있습니다."
								/>
								<TouchableOpacity
									style={MemorialParkLayout.commentsubmit}
									onPress={commentSubmit}
								>
									<Text style={MemorialParkLayout.commentsubmittext}>작성</Text>
								</TouchableOpacity>
							</View>
							<Text style={[MemorialParkLayout.mpTitle]}>
								댓글 ({commentList.length})
							</Text>
							{commentList
								.slice(0, showAllComments ? commentList.length : 3)
								.map((comment, index) => {
									const formattedTime = comment.createTime.replace("T", " ");

									return (
										<View
											style={[MemorialParkLayout.mpComentWarp]}
											key={`comment_${index}`}
										>
											<Text style={[MemorialParkLayout.mpComent]}>
												{comment?.commentContent}
											</Text>
											<View
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<Text style={[MemorialParkLayout.mpComentDate]}>
													{comment?.userName}, {formattedTime}
												</Text>

												{comment.userId === uesrInfo?.userId && (
													<TouchableOpacity
														onPress={() => {
															setSelectedCommentNo(comment.commentNo);
															setConfirmationModalVisible(true);
														}}
													>
														<Text
															style={{
																color: "black",
																paddingRight: responsiveWidth(30),
															}}
														>
															삭제하기
														</Text>
													</TouchableOpacity>
												)}
											</View>
										</View>
									);
								})}

							{commentList.length > 3 && !showAllComments && (
								<View style={[MemorialParkLayout.mpcommentbutton]}>
									<TouchableOpacity onPress={() => setShowAllComments(true)}>
										<Text style={[MemorialParkLayout.mpComent]}>
											댓글 더보기
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					) : (
						<View style={[MemorialParkLayout.mpMarginwrap]}>
							<Text style={[MemorialParkLayout.mpTitle]}>로그인해주세요.</Text>
						</View>
					)}
				</View>
				<View style={[MemorialParkLayout.mpTitlewrap2]}>
					<Text style={MemorialParkLayout.MpDesc}>Memorial 앨범</Text>
					<Text style={[MemorialParkLayout.MpTitle]}>
						추억이 담겨진 Memory를 {"\n"}확인해보세요
					</Text>
				</View>

				<View style={[MemorialParkLayout.mpTitlewrap4]}>
					<View style={[MemorialParkLayout.mpAlbumText]}>
						<Text style={[MemorialParkLayout.mpAlbumTitle]}>
							{data.dogName}의 Memorial 앨범
						</Text>
					</View>

					{LoginStore.isLogged ? (
						<>
							<View style={MemorialParkLayout.mpAlbumcontainer}>
								{feedList
									.slice(0, showAllFeeds ? feedList.length : 9)
									.map((value: any, index: number) => {
										return (
											<TouchableOpacity
												key={`feed_${index}`}
												activeOpacity={0.7}
												onPress={Pickpicture(value)}
											>
												<Image
													source={{ uri: value.photoUrl }}
													style={[MemorialParkLayout.tabImage3]}
												/>
											</TouchableOpacity>
										);
									})}
							</View>

							{feedList.length > 9 && !showAllFeeds && (
								<View style={{ alignItems: "center", marginTop: 10 }}>
									<TouchableOpacity onPress={() => setShowAllFeeds(true)}>
										<Text style={MemorialParkLayout.mpAlbumplusbtn}>
											앨범 더보기
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</>
					) : (
						<View style={[MemorialParkLayout.mpMarginwrap]}>
							<Text style={[MemorialParkLayout.mpTitle]}>로그인해주세요.</Text>
						</View>
					)}
				</View>
				<Footer />
				<Modal
					animationType="fade"
					transparent={true}
					visible={confirmationModalVisible}
					onRequestClose={() => {
						setConfirmationModalVisible(false);
					}}
				>
					<View style={MemorialParkDesignLayout.ripregistercontainer}>
						<View style={MemorialParkDesignLayout.ripregistermodal}>
							<Text style={MemorialParkDesignLayout.ripregistercontent}>
								댓글을 정말로 삭제하시겠습니까?
							</Text>
							<View style={MemorialParkDesignLayout.ripregisterapplycontainer}>
								<TouchableOpacity onPress={handleConfirm}>
									<Text style={MemorialParkDesignLayout.ripregisteryes}>
										예
									</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={handleCancel}>
									<Text style={MemorialParkDesignLayout.ripregisterno}>
										아니오
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</ScrollView>
		</>
	);
};

export default MemorialPark;
