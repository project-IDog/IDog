import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput } from "react-native"
import Checkbox from 'expo-checkbox';
import "react-native-get-random-values";
import { ethers } from "ethers";
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';
import {RPC_URL, SECRET_SALT, NFT_STORAGE} from "@env"

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import WalletProcess from "../components/WalletProcess";
import WalletLoading from "../components/WalletLoading";

import CreateWalletPasswordLayout from "../styles/createWalletPasswordLayout";

const CreateWalletPassword = ({navigation}: any) => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isChecked, setIsChecked] = useState<Boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");

    const RPC_URL = process.env.RPC_URL;
    const SECRET_SALT = process.env.SECRET_SALT;
    const NFT_STORAGE = process.env.NFT_STORAGE;

    const createWallet = async () => {
        if(!isChecked){
            alert('비밀번호 복구불가 안내 문구에 체크해주세요.');
            return;
        }

        if(password !== checkPassword){
            alert('비밀번호를 다시 확인해주세요.');
            return;
        }

        if(!isLoading){
            setIsLoading(true);
        }

        try {
            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const newWallet = ethers.Wallet.createRandom(provider);
            const newMnemonic = await newWallet.mnemonic;
        
            const encrypted = await encryptValue(newMnemonic?.phrase, SECRET_SALT);
            save("encryptedMnemonic", encrypted);

            const getMnemonic = await getValueFor("encryptedMnemonic");

            const decrypted = await decryptValue(getMnemonic, SECRET_SALT);

            const newAccount = await ethers.HDNodeWallet.fromPhrase(decrypted);

            await console.log(SecureStore.setItemAsync("walletAddress", newAccount?.address));
            await console.log(SecureStore.setItemAsync("privateKey", newAccount?.privateKey));
            
            await navigation.navigate('ProtectWallet');
            
            return newMnemonic;
        } catch (error) {
            console.error("Error generating wallet:", error);
        }finally{
            setIsLoading(false);
            setIsChecked(false);
        }
    };

    const encryptValue = (value: any, secretkey: any) => {
        const ciphertext = CryptoJS.AES.encrypt(value, secretkey).toString();
        return ciphertext;
    };

    const decryptValue = (encrypted: any, secretkey: any) => {
        const bytes = CryptoJS.AES.decrypt(encrypted, secretkey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    const save = async (key: any, value: any) => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.log("Failed to save to store:", error);
        }
    };
    
    const getValueFor = async (key: any) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result;
        } else {
            console.log("No values stored under that key.");
        }
    };

    return(
        <>
            <CommonLayout>
                <ColorHeader title="지갑 설정"/>
                <View style={CreateWalletPasswordLayout.titleWrap}>
                    <Text style={CreateWalletPasswordLayout.mainTitle}>비밀번호 생성</Text>
                    <Text style={CreateWalletPasswordLayout.subTitle}>
                        이 비밀번호는 이 기기에서 귀하의 POPPY WALLET 지갑을 잠금 해제할 때만 사용됩니다.
                    </Text>
                </View>
                
                <WalletProcess/>

                <View style={CreateWalletPasswordLayout.formWrap}>
                    <Text style={CreateWalletPasswordLayout.formTitle}>신규 비밀번호</Text>
                    <TextInput
                        placeholder="신규 비밀번호를 입력해주세요."
                        style={CreateWalletPasswordLayout.formInput}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text style={CreateWalletPasswordLayout.formTitle}>비밀번호 확인</Text>
                    <TextInput
                        placeholder="비밀번호 확인을 위해 다시 입력해주세요."
                        style={CreateWalletPasswordLayout.formInput}
                        value={checkPassword}
                        onChangeText={(text) => setCheckPassword(text)}
                    />
                    <View style={CreateWalletPasswordLayout.checkWrap}>
                        <Checkbox
                            style={CreateWalletPasswordLayout.checkbox}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? "#9D9D9D" : "#9D9D9D"}
                        />
                        <Text style={CreateWalletPasswordLayout.checkInfo}>POPPY WALLET은 비밀번호를 복구해드릴 수 없습니다. 이를 이해하고 확인하였습니다.</Text>
                    </View>
                </View>

                <View style={CreateWalletPasswordLayout.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7} onPress={createWallet}>
                        <View style={CreateWalletPasswordLayout.newCreateButton}><Text style={CreateWalletPasswordLayout.newCreateButtonText}>비밀번호 생성하기</Text></View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
            {
                isLoading ?
                <WalletLoading title="지갑 생성 중.. 잠시만 기다려주세요"/>
                :
                <></>
            }
        </>
    );
}

export default CreateWalletPassword;