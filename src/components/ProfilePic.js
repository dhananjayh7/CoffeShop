import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { COLORS, Spacing } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image source={require('../assets/app_images/avatar.png')} style={styles.imgStyle}/>
    </View>
  )
}

const styles = StyleSheet.create({
    ImageContainer:{
        height:Spacing.space_36,
        width: Spacing.space_36,
        borderRadius: Spacing.space_12,
        borderWidth:2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems:'center',
        justifyContent:'center',
        overflow: 'hidden',
    },
    imgStyle:{
        height: Spacing.space_36,
        width: Spacing.space_36,
    }
})

export default ProfilePic