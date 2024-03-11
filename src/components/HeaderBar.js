import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon'
import ProfilePic from './ProfilePic';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
// const headerBarProps {
//     title
// }
const HeaderBar = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
        <GradientBGIcon name= 'menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>
        <Text style={styles.HeaderText}>{title}</Text>
        <ProfilePic />
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer:{
        padding: responsiveScreenWidth(Spacing.space_6),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: Platform.OS=="android"?0:'5%'
    },
    HeaderText:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize: responsiveFontSize(FONTSIZE.size_3),
        color:COLORS.primaryWhiteHex,
    }
})

export default HeaderBar
