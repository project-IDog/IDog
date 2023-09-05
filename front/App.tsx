import { StyleSheet, View, Text, Image, Button } from 'react-native';
import IconButton from './src/components/IconButton';
import Footer from './src/components/Footer';

import CommonLayout from './src/components/CommonLayout';
import MainHeader from './src/components/MainHeader';
import MainImg from "./assets/images/main-puppy-with-girl-walk-img.png";
import TraceMainImg from "./assets/images/trace-main-img.png";
import SleepMainImg from "./assets/images/permanant-sleep-main-img.png";
import NftCardIcon from "./assets/images/nft-card-icon.png";
import VaccineIcon from "./assets/images/vaccine-icon.png";
import AdoptionIcon from "./assets/images/adoption-icon.png";
import PhotoAlbumIcon from "./assets/images/photo-album-icon.png";

export default function App() {
  return (
    <>
      <CommonLayout>
        <MainHeader></MainHeader>
        <View>
          <Text>
            함께걷는 내 반려견
            평생 지켜줄 수 있도록
            서비스이름와 함께
          </Text>
          <Text>
            서비스이름은 내 반려견의 프로필을 NFT화하여
            사육방지를 조장하고 반려견과의 추억을 모으는 플랫폼입니다.
          </Text>
        </View>

        <View>
          <Image
            source={MainImg}
          />
          <View>
            <Button title="산책루트 확인하기"></Button>
            <Text>회원이 아니신가요?</Text>
          </View>
        </View>

        <View>
          <View>
            <Image
              source={TraceMainImg}
            />
          </View>
          <View>
            <Text>
              평생을 함께,
              반려견의 흔적을
              남길 수 있다면
            </Text>
            <Text>
              내 반려견 프로필 등록하셨나요?
              OOO에서 내 반려견의 정보를
              관리하세요.
            </Text>
            <Button title="프로필 등록하기"></Button>
          </View>
        </View>

        <View>
          <Image
            source={SleepMainImg}
          />
          <View>
            <Text>평생 행복하도록.</Text>
            <Text>
              반려견과 함께했던 모든 추억이 잊혀지지 않고
              기억될 수 있도록 온라인 추모공원에서 관리해드려요
            </Text>
            <Button title="온라인 추모공원 둘러보기"></Button>
          </View>
        </View>


        <View>
          <Text>김싸피<Text>님을 위한 내 반려견 서비스</Text></Text>
          <View>
            <IconButton desc="반려견 평생소장" title="프로필 제작" iconImage={NftCardIcon}/>
            <IconButton desc="반려견 다이어리" title="진료기록" iconImage={VaccineIcon} />
          </View>
          <View>
            <IconButton desc="간편한 소유권 증명" title="입양절차" iconImage={AdoptionIcon}/>
            <IconButton desc="포토앨범" title="사진첩" iconImage={PhotoAlbumIcon} />
          </View>
        </View>


        <Footer/>
      </CommonLayout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
