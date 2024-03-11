import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, Spacing } from '../theme/theme'
import CustomIcons from './CustomIcons'
import { responsiveFontSize, responsiveScreenHeight, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';

const GradientBGIcon = ({name, color, size}) => {
  return (
    <View style={styles.container}>
      <LinearGradient 
        start={{x:0, y:0}}
        end = {{x:1, y:1}}
        style={styles.LinearGradientBG}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      >
        <CustomIcons name={name} color={color} size={size}/>

      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: Spacing.space_12,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.secondaryDarkGreyHex,
        overflow:'hidden',
    },
    LinearGradientBG:{
        height: responsiveHeight(Spacing.space_5),
        width: responsiveWidth(Spacing.space_10),
        alignItems:'center',
        justifyContent:'center',
    }
})

export default GradientBGIcon;