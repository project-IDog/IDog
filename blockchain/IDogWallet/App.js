import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import 'react-native-get-random-values';

import { ethers } from 'ethers';
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';


export default function App() {
  const [password, setPassword] = useState('');

  const RPC_URL = process.env.RPC_URL;
  const SECRET_SALT = process.env.SECRET_SALT;

  //1. 니모닉 생성 (지갑 생성)
  // 지갑을 생성하면 첫번째 계정은 만들어진다. (디폴트 경로가 있으니까)
  const createWallet = async() => {
    try {
      //1-1. 지갑 생성(= 마스터노드 생성)
      const rpcUrl = RPC_URL;
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const newWallet = ethers.Wallet.createRandom(provider);
      //테스트용
      // const newWallet = ethers.Wallet.createRandom();
      console.log(newWallet);
      const newMnemonic = newWallet.mnemonic;
      console.log("newMnemonicPhrase(니모닉의 12개 단어구문) : ", newMnemonic.phrase);

      //1-2. 니모닉 암호화 
      const encrypted = encryptValue(newMnemonic.phrase, SECRET_SALT);
      console.log("encrypted : ", encrypted);

      //2-3. 암호화된 값 store에 저장
      save("encryptedMnemonic", encrypted);

      //2-4 store에서 암호화된 phrase 가져오기
      const getMnemonic = await getValueFor("encryptedMnemonic");

      //2-5 phrase 복호화
      const decrypted = decryptValue(getMnemonic, SECRET_SALT);
      console.log("decrypted : ", decrypted);

      //2-6 첫번째 계정 읽어오기
      const newAccount = await ethers.HDNodeWallet.fromPhrase(decrypted);
      console.log("newAccount : " , newAccount);

      return newMnemonic;
    } catch(error){
      console.error("Error generating wallet:", error);
    }
  }

  // 니모닉 암호화
  const encryptValue = (value, secretkey) => {
    const ciphertext = CryptoJS.AES.encrypt(value, secretkey).toString();
    return ciphertext;
  }

  // 니모닉 복호화
  const decryptValue = (encrypted, secretkey) => {
    const bytes  = CryptoJS.AES.decrypt(encrypted, secretkey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } 

  // 모바일기기 store에 저장하는 function
  const save = async(key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log("Saved to store");
    } catch (error) {
      console.log("Failed to save to store:", error);
    }
  }

  // store 에 저장된 값을 불러오는 function
  const getValueFor= async(key) => {
    console.log(key);
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      // alert("🔐 Here's your value 🔐 \n" + result);
      return result;
    } else {
      console.log("No values stored under that key.");
    }
  }

  
  return ( 
    <View style={styles.container}>
      <Text>디지털지갑</Text>
      <TextInput 
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Text>--------------------------------------</Text>
      <Button title="Create Wallet" onPress={createWallet} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
