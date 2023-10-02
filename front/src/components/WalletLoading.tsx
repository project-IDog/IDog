import {View, Text, Image} from "react-native"

import WalletLoadingLayout from "../styles/walletLoadingLayout";

const WalletLoading = () => {
    return(
        <>
            <View style={WalletLoadingLayout.modalBack}></View>
            <View style={WalletLoadingLayout.modalMain}>
                <Image
                    source={require('../../assets/images/pet-animation.gif')}
                    style={WalletLoadingLayout.petAnimation}
                />
                <Text style={WalletLoadingLayout.loadingText}>지갑 생성 중.. 잠시만 기다려주세요</Text>
            </View>
        </>
    );
}

export default WalletLoading;