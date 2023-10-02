import {View, Text, Image} from "react-native"

import WalletLoadingLayout from "../styles/walletLoadingLayout";

const WalletLoading = ({title}: any) => {
    return(
        <>
            <View style={WalletLoadingLayout.modalBack}></View>
            <View style={WalletLoadingLayout.modalMain}>
                <Image
                    source={require('../../assets/images/pet-animation.gif')}
                    style={WalletLoadingLayout.petAnimation}
                />
                <Text style={WalletLoadingLayout.loadingText}>{title}</Text>
            </View>
        </>
    );
}

export default WalletLoading;