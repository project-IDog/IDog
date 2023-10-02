import {View, Text, Image} from "react-native"

import LockIcon from "../../assets/images/lock-icon.png"
import WalletIcon from "../../assets/images/wallet-icon.png"
import SecurityIcon from "../../assets/images/security-icon.png"

import WhiteLockIcon from "../../assets/images/white-lock-icon.png"
import WhiteWalletIcon from "../../assets/images/white-wallet-icon.png"
import WhiteSecurityIcon from "../../assets/images/white-security-icon.png"

import WalletProcessLayout from "../styles/walletProcessLayout"

const WalletProcess = () => {
    return(
        <>
            <View style={WalletProcessLayout.processWrap}>
                <View style={WalletProcessLayout.iconCenterWrap}>
                    <View style={WalletProcessLayout.iconWrap}>
                        <Image
                            source={WhiteLockIcon}
                            style={WalletProcessLayout.icon}
                        />
                    </View>
                    <Text style={WalletProcessLayout.iconText}>비밀번호 생성</Text>
                </View>
                <View style={WalletProcessLayout.inlineLine}></View>
                <View style={WalletProcessLayout.iconCenterWrap}>
                    <View style={WalletProcessLayout.iconWrap}>
                        <Image
                            source={WhiteWalletIcon}
                            style={WalletProcessLayout.icon}
                        />
                    </View>
                    <Text style={WalletProcessLayout.iconText}>지갑 보호</Text>
                </View>
                <View style={WalletProcessLayout.inlineLine}></View>
                <View style={WalletProcessLayout.iconCenterWrap}>
                    <View style={WalletProcessLayout.iconWrap}>
                        <Image
                            source={WhiteSecurityIcon}
                            style={WalletProcessLayout.icon}
                        />
                    </View>
                    <Text style={WalletProcessLayout.iconText}>복구 구문 확인</Text>
                </View>
            </View>
        </>
    );
}

export default WalletProcess;