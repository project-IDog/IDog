import {View, Text, TouchableOpacity, Image} from "react-native"

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";

import CreateWalletMainLayout from "../styles/CreateWalletMainLayout";

import WalletMainImg from "../../assets/images/wallet-main-img.png";

const CreateWalletMain = ({navigation} : any) => {
    return(
        <>
            <CommonLayout>
                <ColorHeader title="지갑 설정"/>
                <View style={CreateWalletMainLayout.createTitleWrap}>
                    <Text style={CreateWalletMainLayout.mainTitle}>지갑 설정</Text>
                    <Text style={CreateWalletMainLayout.subTitle}>기존 지갑을 불러오거나 새 지갑을 만드세요.</Text>
                </View>
                <Image
                    source={WalletMainImg}
                    style={CreateWalletMainLayout.mainWalletImg}
                />
                <View style={CreateWalletMainLayout.buttonWrap}>
                    <TouchableOpacity>
                        <View style={CreateWalletMainLayout.reButton}>
                            <Text style={CreateWalletMainLayout.reButtonText}>비밀 복구 구문을 활용해 불러오기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AgreeWallet')}>
                        <View style={CreateWalletMainLayout.createButton}>
                            <Text style={CreateWalletMainLayout.createButtonText}>새 지갑 생성하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default CreateWalletMain;