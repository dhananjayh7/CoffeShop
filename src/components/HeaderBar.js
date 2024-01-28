import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon'
import ProfilePic from './ProfilePic';

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
        padding: Spacing.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color:COLORS.primaryWhiteHex,
    }
})

export default HeaderBar
