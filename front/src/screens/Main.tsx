import { TouchableOpacity, View, Text, Image } from "react-native";
import IconButton from "../components/IconButton";
import Footer from "../components/Footer";
import MainLayout from "../styles/mainLayout";

import CommonLayout from "../components/CommonLayout";
import MainHeader from "../components/MainHeader";
import MainImg from "../../assets/images/main-puppy-with-girl-walk-img.png";
import TraceMainImg from "../../assets/images/trace-main-img.png";
import SleepMainImg from "../../assets/images/permanant-sleep-main-img.png";
import NftCardIcon from "../../assets/images/nft-card-icon.png";
import VaccineIcon from "../../assets/images/vaccine-icon.png";
import AdoptionIcon from "../../assets/images/adoption-icon.png";
import PhotoAlbumIcon from "../../assets/images/photo-album-icon.png";

const Main = ({navigation}: any) => {
  return (
    <>
      <CommonLayout>
        <MainHeader></MainHeader>

        <View style={MainLayout.walkMainWrap}>
          <Text style={MainLayout.walkMainTitle}>
            함께걷는 내 반려견{"\n"}
            평생 지켜줄 수 있도록{"\n"}
            <Text style={MainLayout.walkBoldText}>IDog</Text> 와 함께
          </Text>
          <Text style={MainLayout.walkMainDesc}>
            IDog은 내 반려견의 프로필을 NFT화하여{"\n"}
            사육방지를 조장하고 반려견과의 추억을 모으는 플랫폼입니다.
          </Text>
        </View>

        <View>
          <View style={MainLayout.walkMainImg}>
            <Image
              source={MainImg}
            />
          </View>
          <View style={MainLayout.walkButtonWrap}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Walk')}>
              <View style={MainLayout.walkRootButton}><Text style={MainLayout.walkRootButtonText}>산책루트 확인하기</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CreateWalletMain')}>
              <Text style={MainLayout.ifNoAuthText}>회원이 아니신가요?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={MainLayout.traceWrap}>
          <View>
            <Image
              source={TraceMainImg}
              style={MainLayout.traceMainImg}
            />
          </View>
          <View style={MainLayout.traceInfo}>
            <Text style={MainLayout.traceTitle}>
              평생을 함께,{"\n"}
              <Text style={MainLayout.boldTraceInfo}>반려견의 흔적</Text>을{"\n"}
              남길 수 있다면
            </Text>
            <Text style={MainLayout.traceDesc}>
              내 반려견 <Text style={MainLayout.boldTraceDesc}>프로필 등록</Text>하셨나요?{"\n"}
              IDog에서 내 반려견의 정보를{"\n"}
              관리하세요.
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={MainLayout.createProfileButton}><Text style={MainLayout.createProfileButtonText}>프로필 등록하기</Text></View>
            </TouchableOpacity>
          </View>
        </View>

				<View style={MainLayout.tribeWrap}>
					<Image source={SleepMainImg} style={MainLayout.tribeMainImg} />
					<View style={MainLayout.tribeInfoWrap}>
						<Text style={MainLayout.tribeTitle}>평생 행복하도록.</Text>
						<Text style={MainLayout.tribeDesc}>
							반려견과 함께했던 모든 추억이 잊혀지지 않고{"\n"}
							기억될 수 있도록 온라인 추모공원에서 관리해드려요
						</Text>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={MainLayout.moveTribeButton}>
								<Text style={MainLayout.moveTribeButtonText}>
									온라인 추모공원 둘러보기
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View style={MainLayout.randingButtonWrap}>
					<Text style={MainLayout.randingTitle}>
						<Text style={MainLayout.boldRandingTitle}>김싸피</Text> 님을 위한 내
						반려견 서비스
					</Text>
					<View style={MainLayout.flexButtonWrap}>
						<IconButton
							desc="반려견 평생소장"
							title="프로필 제작"
							iconImage={NftCardIcon}
						/>
						<IconButton
							desc="반려견 다이어리"
							title="진료기록"
							iconImage={VaccineIcon}
						/>
					</View>
					<View style={MainLayout.flexButtonWrap}>
						<IconButton
							desc="간편한 소유권 증명"
							title="입양절차"
							iconImage={AdoptionIcon}
						/>
						<IconButton
							desc="포토앨범"
							title="사진첩"
							iconImage={PhotoAlbumIcon}
						/>
					</View>
				</View>

				<Footer />
			</CommonLayout>
		</>
	);
};

export default Main;
