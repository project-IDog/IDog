import {View, Text, Image} from "react-native"

import LockIcon from "../../assets/images/lock-icon.png"
import WalletIcon from "../../assets/images/wallet-icon.png"
import SecurityIcon from "../../assets/images/security-icon.png"

import WalletProcessLayout from "../styles/walletProcessLayout"

const WalletProcess = () => {
    return(
        <>
            <View style={WalletProcessLayout.processWrap}>
                <View style={WalletProcessLayout.iconCenterWrap}>
                    <View style={WalletProcessLayout.iconWrap}>
                        <Image
                            source={LockIcon}
                            style={WalletProcessLayout.icon}
                        />
                    </View>
                    <Text style={WalletProcessLayout.iconText}>비밀번호 생성</Text>
                </View>
                <View style={WalletProcessLayout.inlineLine}></View>
                <View style={WalletProcessLayout.iconCenterWrap}>
                    <View style={WalletProcessLayout.iconWrap}>
                        <Image
                            source={WalletIcon}
                            style={WalletProcessLayout.icon}
                        />
                    </View>
                    <Text style={WalletProcessLayout.iconText}>지갑 보호</Text>
                </View>
                <View style={WalletProcessLayout.inlineLine}></View>
                <View style={WalletProcessLayout.iconCenterWrap}>
                    <View style={WalletProcessLayout.iconWrap}>
                        <Image
                            source={SecurityIcon}
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