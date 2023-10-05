import {View, Text, TouchableOpacity, Image} from "react-native"

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";

import IdogWalletImg from "../../assets/images/idog-wallet.png"; 

import CreateWalletMainLayout from "../styles/CreateWalletMainLayout";

const CreateWalletMain = ({navigation} : any) => {
    return(
        <>
            <CommonLayout>
                <ColorHeader title="지갑 설정"/>
                <View style={CreateWalletMainLayout.createTitleWrap}>
                    <Text style={CreateWalletMainLayout.mainTitle}>지갑 설정</Text>
                    <Text style={CreateWalletMainLayout.subTitle}>기존 지갑을 불러오거나 새 지갑을 만드세요.</Text>
                </View>
                <View style={CreateWalletMainLayout.walletCenterWrap}>
                    <Image
                        source={IdogWalletImg}
                        style={CreateWalletMainLayout.idogWalletImg}
                    />
                </View>
                <View style={CreateWalletMainLayout.buttonWrap}>
                    <TouchableOpacity onPress={() => navigation.navigate('AgreeWallet')}>
                        <View style={CreateWalletMainLayout.reButton}>
                            <Text style={CreateWalletMainLayout.reButtonText}>새 지갑 생성하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                        <View style={CreateWalletMainLayout.createButton}>
                            <Text style={CreateWalletMainLayout.createButtonText}>메인으로 돌아가기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default CreateWalletMain;