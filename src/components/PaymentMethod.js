import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import CustomIcons from './CustomIcons'

const PaymentMethod = ({ paymentMode, name, icon, isIcon}) => {
  return (
    <View style={[styles.PaymentCardContainer,{borderColor: paymentMode == name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}]}>
      {
        isIcon?
        <LinearGradient
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style= {styles.LinearGradientWallet}
        >
            <View style={styles.WalletRow}>
                <CustomIcons name = 'wallet' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_30}/>
                <Text style={styles.paymentTitle}>{name}</Text>
            </View>
            <Text style={styles.PaymentPrice}>$ 100.50 </Text>
        </LinearGradient>
        :  
        <LinearGradient
                start={{x:0, y:0}}
                end={{x:1, y:1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style= {styles.LinearGradientRegular}
        >
                <Image source={icon} style={styles.PaymentImage}/>
                <Text style={styles.paymentTitle}>{name}</Text>
        </LinearGradient>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    PaymentCardContainer:{
        borderRadius: BORDERRADIUS.radius_15 * 2,
        backgroundColor: COLORS.primaryGreyHex,
        borderWidth: 3,
    },
    LinearGradientWallet:{
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.space_12,
        paddingHorizontal: Spacing.space_24,
        gap: Spacing.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2
    },
    WalletRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.space_24,

    },
    paymentTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
     PaymentPrice:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
     },
     LinearGradientRegular:{
        flexDirection : 'row',
        alignItems: 'center',
        padding: Spacing.space_12,
        paddingHorizontal: Spacing.space_24,
        gap: Spacing.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2
     },
     PaymentImage:{
        height: Spacing.space_30,
        width: Spacing.space_30,
     },


})

export default PaymentMethod