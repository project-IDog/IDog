import {useState,useEffect} from "react"
import {View, Text, TouchableOpacity} from "react-native"
import * as SecureStore from 'expo-secure-store';

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import WalletProcess from "../components/WalletProcess";
import Footer from "../components/Footer";

import ProtectWalletLayout from "../styles/protectWalletLayout";

const ProtectWallet = ({navigation}: any) => {
    const [clickStatus, setClickStatus] = useState<boolean>(false);
    const [mnemonic, setMnemonic] = useState<string>();

    const showMnemonic = () => {
        setClickStatus(true);
    }

    useEffect(() => {
        const getMnemonic = async () => {
            const mnemonic = await SecureStore.getItemAsync("mnemonic");
            console.log("mnemonic", mnemonic);
            setMnemonic(String(mnemonic));
        }
        getMnemonic();
    }, []);
    return(
        <>
            <CommonLayout>
                <ColorHeader title="계정 설정"/>
                <View style={ProtectWalletLayout.titleWrap}>
                    <Text style={ProtectWalletLayout.mainTitle}>지갑을 보호하세요.</Text>
                    <Text style={ProtectWalletLayout.subTitle}>
                        다음을 저장해 지갑을 보호하세요.
                        비밀 복구 구문 해당 구문은 믿을 수 있는 장소에 저장하세요.
                    </Text>
                </View>
                    
                <WalletProcess/>

                <TouchableOpacity activeOpacity={0.7} onPress={() => showMnemonic()}>
                    <View style={ProtectWalletLayout.newmonicWrap}>
                        
                            {
                                clickStatus ?
                                <Text style={ProtectWalletLayout.newmonicContents}>{mnemonic}</Text>
                                :
                                <Text style={ProtectWalletLayout.newmonicContents}>이 곳을 클릭하여 복구 구문을 확인하세요.</Text>
                            }
                    </View>
                </TouchableOpacity>
                <View style={ProtectWalletLayout.newmonicInfoWrap}>
                    <Text style={ProtectWalletLayout.newmonicInfoText}>이것은 앱이 잠겨 있거나 새 기기를 얻었을 때 지갑을 복구하는 유일한 방법입니다. 안전한 곳에 보관해주세요.</Text>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Main')}>
                    <View style={ProtectWalletLayout.createButton}>
                        <Text style={ProtectWalletLayout.createButtonText}>계정 생성 완료</Text>
                    </View>
                </TouchableOpacity>
                
                <Footer/>
            </CommonLayout>
        </>
    );
}

export default ProtectWallet;