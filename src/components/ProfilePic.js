import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { COLORS, Spacing } from '../theme/theme'
import { responsiveFontSize, responsiveScreenHeight, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';
const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image source={require('../assets/app_images/avatar.png')} style={styles.imgStyle}/>
    </View>
  )
}

const styles = StyleSheet.create({
    ImageContainer:{
        height:responsiveHeight(Spacing.space_6),
        width: responsiveWidth(Spacing.space_12),
        borderRadius: responsiveWidth(Spacing.space_4),
        borderWidth:2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems:'center',
        justifyContent:'center',
        overflow: 'hidden',
    },
    imgStyle:{
        height: responsiveHeight(Spacing.space_6),
        width: responsiveWidth(Spacing.space_12),
        // resizeMode:'center',
    }
})

export default ProfilePic