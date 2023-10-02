import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput } from "react-native"
import Checkbox from 'expo-checkbox';
import "react-native-get-random-values";
import { ethers } from "ethers";
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';
import {RPC_URL, SECRET_SALT, NFT_STORAGE} from "@env"
import axios from "axios"

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
            axios.get('http://10.0.2.2:3000').then(async (data) => {
                const encryptedValue = data.data;
                const decrypted = await decryptValue(encryptedValue, SECRET_SALT);
                const newAccount = await ethers.HDNodeWallet.fromPhrase(decrypted);
                console.log("newAccount", newAccount);
                await SecureStore.setItemAsync("walletAddress", newAccount?.address);
                await SecureStore.setItemAsync("privateKey", newAccount?.privateKey);
                await SecureStore.setItemAsync("mnemonic", String(newAccount?.mnemonic?.phrase));

                const walletAddress = await SecureStore.getItemAsync("walletAddress");
                const privateKey = await SecureStore.getItemAsync("privateKey");
                const Mnemonic = await newAccount?.mnemonic?.phrase;
        
                await navigation.navigate('ProtectWallet');
            })
        } catch (error) {
            console.error("Error generating wallet:", error);
        }finally{
            setIsLoading(false);
            setIsChecked(false);
        }
    };

    const decryptValue = (encrypted: any, secretkey: any) => {
        const bytes = CryptoJS.AES.decrypt(encrypted, secretkey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
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