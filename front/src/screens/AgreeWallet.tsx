import {View, Text, TouchableOpacity} from "react-native"

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";

const AgreeWallet = () => {
    return(
        <>
            <CommonLayout>
                <ColorHeader title="지갑 설정"/>
            </CommonLayout>
        </>
    );
}

export default AgreeWallet;