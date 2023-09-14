import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput } from "react-native"
import Checkbox from 'expo-checkbox';

import CommonLayout from "../components/CommonLayout";
import ColorHeader from "../components/ColorHeader";
import Footer from "../components/Footer";
import WalletProcess from "../components/WalletProcess";
import WalletLoading from "../components/WalletLoading";

import CreateWalletPasswordLayout from "../styles/createWalletPasswordLayout";

const CreateWalletPassword = ({navigation}: any) => {
    const [isChecked, setIsChecked] = useState<Boolean>(false);
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
                    />
                    <Text style={CreateWalletPasswordLayout.formTitle}>비밀번호 확인</Text>
                    <TextInput
                        placeholder="비밀번호 확인을 위해 다시 입력해주세요."
                        style={CreateWalletPasswordLayout.formInput}
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
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ProtectWallet')}>
                        <View style={CreateWalletPasswordLayout.newCreateButton}><Text style={CreateWalletPasswordLayout.newCreateButtonText}>비밀번호 생성하기</Text></View>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </CommonLayout>
            {/* <WalletLoading/> */}
        </>
    );
}

export default CreateWalletPassword;