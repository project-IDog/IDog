import { StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";

const Footer = () => {
    return(
        <>
            <View style={styles.footerWrap}>
                <Text style={styles.footerTitle}>ABOUT US</Text>
                <Text style={styles.footerInfo}>상호 : IDog, 전화: 02-3429-5100</Text>
                <Text style={styles.footerInfo}>주소 : 서울특별시 강남구 테헤란로 212</Text>
                <Text style={styles.footerInfo}>평일 상담시간 : 09:00 ~ 18:00</Text>
                <Text style={styles.footerInfo}>이메일 : ssafy@ssafy.com</Text>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.footerButton}><Text style={styles.footerButtonText}>이용약관</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.footerButton}><Text style={styles.footerButtonText}>개인정보처리방침</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={styles.footerButton}><Text style={styles.footerButtonText}>이용안내</Text></View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.copyright}>COPYRIGHTⓒ2023.IDog반려견커뮤니티 ALL. RIGHTS RESERVED</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    footerWrap: {
        display:"flex",
        flexDirection:"column",
        alignItems: "center",
        backgroundColor:"#F6F6F6",
        paddingTop:34,
        paddingBottom:34,
    },
    footerTitle:{
        fontSize:18,
        fontWeight:"900",
        color:"#272727",
    },
    footerInfo:{
        fontSize:14,
        fontWeight:"400",
        color: "#939393",
        marginTop:4,
    },
    footerButtonWrap:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
    },
    footerButton:{
        backgroundColor:"#EAEAEA",
        boxSizing:"border-box",
        padding:8,
        margin:4,
    },
    footerButtonText:{
        fontSize:16,
        fontWeight:"400",
        color:"#A3A3A3",
    },
    copyright:{
        fontSize:12,
        fontWeight:"500",
        color:"#9D9D9D",
    }

});

export default Footer;