import {View, Text, Button} from "react-native";

const Footer = () => {
    return(
        <>
            <View>
                <Text>ABOUT US</Text>
                <Text>상호 : OOO 전화: 02-3429-5100</Text>
                <Text>주소 : 서울특별시 강남구 테헤란로 212</Text>
                <Text>평일 상담시간 : 09:00 ~ 18:00</Text>
                <Text>이메일 : ssafy@ssafy.com</Text>
                <View>
                    <Button title="이용약관"></Button>
                    <Button title="개인정보처리방침"></Button>
                    <Button title="이용안내"></Button>
                </View>
                <Text>COPYRIGHTⓒ2020.반려견커뮤니티 ALL. RIGHTS RESERVED</Text>
            </View>
        </>
    )
}

export default Footer;