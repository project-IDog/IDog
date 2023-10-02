import {View, Text, TouchableOpacity, Image} from "react-native"

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";

import CheckIcon from "../../assets/images/check-icon.png"
import WarningIcon from "../../assets/images/warning-icon.png"

import AgreeWalletLayout from "../styles/AgreeWalletLayout";

const AgreeWallet = ({navigation}: any) => {
    return(
        <>
            <CommonLayout>
                <ColorHeader title="지갑 설정"/>
                <View style={AgreeWalletLayout.titleWrap}>
                    <Text style={AgreeWalletLayout.mainTitle}>POPPY WALLET 개선에 도움을 주세요</Text>
                    <Text style={AgreeWalletLayout.subTitle}>POPPY WALLET은 사용자가 모바일 앱을 어떻게 사용하는지 이해하기 위해 기본적인 사용 데이터를 수집하고자 합니다. 이 데이터는 당사 제품의 사용 편의성과 사용자 경험을 지속적으로 개선하기 위해 사용됩니다.</Text>
                </View>

                <View style={AgreeWalletLayout.agreeWrap}>
                    <Text style={AgreeWalletLayout.agreeTitle}>POPPY WALLET은</Text>
                    <View style={AgreeWalletLayout.agreeContentWrap}>
                        <Image
                            source={CheckIcon}
                            style={AgreeWalletLayout.agreeIcon}
                        />
                        <Text style={AgreeWalletLayout.agreeText}>설정을 통해 수신 거부를 설정할 수 있도록 허용합니다.</Text>
                    </View>
                    <View style={AgreeWalletLayout.agreeContentWrap}>
                        <Image
                            source={CheckIcon}
                            style={AgreeWalletLayout.agreeIcon}
                        />
                        <Text style={AgreeWalletLayout.agreeText}>익명화된 클릭 및 페이지 뷰 이벤트를 전송합니다.</Text>
                    </View>
                    <View style={AgreeWalletLayout.agreeContentWrap}>
                        <Image
                            source={WarningIcon}
                            style={AgreeWalletLayout.agreeIcon}
                        />
                        <Text style={AgreeWalletLayout.agreeText}>절대 국가, 지역, 도시 데이터를 전송하지 않습니다.</Text>
                    </View>
                    <View style={AgreeWalletLayout.agreeContentWrap}>
                        <Image
                            source={WarningIcon}
                            style={AgreeWalletLayout.agreeIcon}
                        />
                        <Text style={AgreeWalletLayout.agreeText}>절대 키, 주소, 거래, 잔고, 해시 또는 개인정보를 수집하지 않습니다.</Text>
                    </View>
                    <View style={AgreeWalletLayout.agreeContentWrap}>
                        <Image
                            source={WarningIcon}
                            style={AgreeWalletLayout.agreeIcon}
                        />
                        <Text style={AgreeWalletLayout.agreeText}>절대 사용자의 IP주소를 수집하지 않습니다.</Text>
                    </View>
                </View>

                <View style={AgreeWalletLayout.subTextWrap1}>
                    <Text style={AgreeWalletLayout.subText1}>이 데이터는 집계 처리된 정보이며 일반 데이터 보호 규정 (EU) 2016/679의 목적에 따라 익명으로 관리됩니다.</Text>
                </View>

                <View style={AgreeWalletLayout.subTextWrap2}>
                    <Text style={AgreeWalletLayout.subText2}>*POPPY WALLET에서 Infura를 기본 RPC 공급업체로 이용하는 경우, 거래 전송 시 Infura가 IP 주소와 이더리움 지갑 주소 정보를 수집합니다. POPPY WALLET은 해당 두 정보를 연계할 수 있는 방식으로 정보를 저장하지 않습니다. 계속 진행하기 전에 RPC 공급업체 이용방식을 구성할 수 있습니다.</Text>
                </View>

                <View style={AgreeWalletLayout.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7} style={AgreeWalletLayout.widthWrap}>
                        <View style={AgreeWalletLayout.disAgreeButton}>
                            <Text style={AgreeWalletLayout.disAgreeButtonText}>아니요, 괜찮습니다.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={AgreeWalletLayout.widthWrap} onPress={() => navigation.navigate('CreateWalletPassword')}>
                        <View style={AgreeWalletLayout.agreeButton}>
                            <Text style={AgreeWalletLayout.agreeButtonText}>동의합니다.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default AgreeWallet;