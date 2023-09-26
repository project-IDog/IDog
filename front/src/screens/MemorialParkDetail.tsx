import react, { useRef, useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
	ScrollView,
} from "react-native";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import MemorialParkLayout from "../styles/MemorialParkLayout";
import MpImage from "../../assets/images/MpImg.jpg";
import SubMainRip from "../components/SubMainRip";
import MemorialParkLoading from "./MemorialParkLoading";
import { set } from "mobx";
import flower1 from "../../assets/flower1.json";
import LottieView from "lottie-react-native";
import axios from "../utils/axios";

const MemorialPark: React.FC = (props) => {
	const { route } = props;
	const { data } = route.params;
	console.log(data);
	const loadingOpacity = useRef(new Animated.Value(1)).current;
	const [isSkipped, setIsSkipped] = useState(false);
	const [isFullyTransparent, setIsFullyTransparent] = useState(false);
	const [scrollenable, setScrollenable] = useState(false);
	const [commentList, setCommentList] = useState<Object[]>([]);
	const [showAllComments, setShowAllComments] = useState(false);

	useEffect(() => {
		axios.get("/comment/3").then((data) => {
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

	if (commentList.length !== 0) {
		console.log("코멘트: ", commentList);
	}

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
					{/* <View></View> */}
				</Animated.View>
				<MainHeader />
				<SubMainRip
					subTitle="추모공원"
					mainTitle={`반려견에게 영원한 평화와 \n행복을 기원합니다.`}
					bgImg={MpImage}
					desc="추모하기"
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
							<Image source={MpImage} style={[MemorialParkLayout.tabImage]} />
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
									<Image
										source={MpImage}
										style={[MemorialParkLayout.tabImage2]}
									/>
									<Image
										source={MpImage}
										style={[MemorialParkLayout.tabImage2]}
									/>
									<Image
										source={MpImage}
										style={[MemorialParkLayout.tabImage2]}
									/>
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
					<View style={[MemorialParkLayout.mpMarginwrap]}>
						<Text style={[MemorialParkLayout.mpTitle]}>
							댓글 ({commentList.length})
						</Text>
						{commentList
							.slice(0, showAllComments ? commentList.length : 3)
							.map((comment, index) => {
								const formattedTime = comment.createTime.replace("T", " ");
								return (
									<View style={[MemorialParkLayout.mpComentWarp]}>
										<Text style={[MemorialParkLayout.mpComent]}>
											{comment?.commentContent}
										</Text>
										<Text style={[MemorialParkLayout.mpComentDate]}>
											{comment?.userName}, {formattedTime}
										</Text>
									</View>
								);
							})}

						{commentList.length > 3 && !showAllComments && (
							<View style={[MemorialParkLayout.mpcommentbutton]}>
								<TouchableOpacity onPress={() => setShowAllComments(true)}>
									<Text style={[MemorialParkLayout.mpComent]}>댓글 더보기</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
				<View style={[MemorialParkLayout.mpTitlewrap2]}>
					<Text style={MemorialParkLayout.MpDesc}>Memorial 앨범</Text>
					<Text style={[MemorialParkLayout.MpTitle]}>
						추억이 담겨진 Memory를 {"\n"}확인해보세요
					</Text>
				</View>
				<View style={[MemorialParkLayout.mpTitlewrap3]}>
					<View style={[MemorialParkLayout.mpMarginwrap]}>
						<Text style={[MemorialParkLayout.mpAlbumTitle]}>
							뽀삐의 Memorial 앨범
						</Text>
						<View>
							<View style={[MemorialParkLayout.mpAlbumwarp]}>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
							</View>
							<View style={[MemorialParkLayout.mpAlbumwarp]}>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
							</View>
							<View style={[MemorialParkLayout.mpAlbumwarp]}>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
								<Image
									source={MpImage}
									style={[MemorialParkLayout.tabImage3]}
								/>
							</View>
						</View>

						<View style={[MemorialParkLayout.mpcommentbutton]}>
							<TouchableOpacity>
								<Text style={[MemorialParkLayout.mpComent]}>앨범 더보기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<Footer />
			</ScrollView>
		</>
	);
};

export default MemorialPark;
