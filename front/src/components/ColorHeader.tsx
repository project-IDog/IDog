import {useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import SideMenu from './SideMenu';
import Preview from "../../assets/images/preview-icon.png"
import HamburgerIcon from "../../assets/images/hamburger-menu-icon.png"

const ColorHeader = ({title}: any) => {
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
    return(
        <>
            <View style={styles.whiteHeaderWrap}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
                    <Image
                        source={Preview}
                    />
                </TouchableOpacity>
                <View style={styles.logoWrap}>
                    <Text style={styles.logoTitle}>LOGO</Text>
                    <View style={styles.verticalLine}></View>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
                    <Image
                        source={HamburgerIcon}
                    />
                </TouchableOpacity>

                {
                    activeSideMenu ?
                    <SideMenu/>
                    :
                    <></>
                }
            </View>
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
        color:"#EE8A72",
    },
    verticalLine:{
        width:2,
        height:20,
        backgroundColor:"#EE8A72",
        marginHorizontal:10,
    },
    headerTitle:{
        fontSize:18,
        fontWeight:"700",
        color:"#656565",
    }
});

export default ColorHeader;