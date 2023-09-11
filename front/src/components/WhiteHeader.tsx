import {useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { useNavigation } from '@react-navigation/native';
import WhitePreview from "../../assets/images/white-preview-icon.png"
import WhiteHamburgerIcon from "../../assets/images/white-hamburger-menu.png"
import SideMenu from './SideMenu';

const WhiteHeader = ({title}: any) => {
    const navigation = useNavigation();
    const [activeSideMenu, setActiveSideMenu] = useState<Boolean>(false);
    const clickHamburger = () => {
        switch(activeSideMenu){
        case true:
            setActiveSideMenu(false);
            break;
        case false:
            setActiveSideMenu(true);
            break;
        }
    }

    const updateActiveSideMenu = (status : Boolean) => {
        setActiveSideMenu(status)
    }

    return(
        <>
            <View style={styles.whiteHeaderWrap}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
                    <Image
                        source={WhitePreview}
                    />
                </TouchableOpacity>
                <View style={styles.logoWrap}>
                    <Text style={styles.logoTitle}>LOGO</Text>
                    <View style={styles.verticalLine}></View>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
                    <Image
                        source={WhiteHamburgerIcon}
                    />
                </TouchableOpacity>
            </View>
            {
                activeSideMenu ?
                <SideMenu updateActiveSideMenu={updateActiveSideMenu}/>
                :
                <></>
            }
        </>
    );
}

const styles = StyleSheet.create({
    whiteHeaderWrap:{
        height:80,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:responsiveWidth(2),
    },
    logoWrap:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    logoTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#FFFFFF",
    },
    verticalLine:{
        width:2,
        height:20,
        backgroundColor:"#FFFFFF",
        marginHorizontal:10,
    },
    headerTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#FFFFFF",
    }
});

export default WhiteHeader;