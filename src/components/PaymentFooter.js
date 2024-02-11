import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'

const PaymentFooter = ({price, buttonPressHandler, buttonTitle}) => {
  return (
    <View style={styles.PaymentFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.priceText}> 
        {price.currency} <Text style={styles.price}>
                {price.price}
            </Text>
        </Text>
      </View>
      <TouchableOpacity 
        onPress={()=>buttonPressHandler()}
        style={styles.payButton}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    PaymentFooter:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap: Spacing.space_20,
        padding : Spacing.space_20
    },
    PriceContainer:{
        alignItems:'center',
        width: 100,

    },
    PriceTitle:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex
    },
    priceText:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex
    },
    price:{
        color: COLORS.primaryWhiteHex
    },
    payButton:{
        backgroundColor:COLORS.primaryOrangeHex,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height: Spacing.space_36 * 1.5,
        borderRadius: BORDERRADIUS.radius_20
    },
    buttonText:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    }
})

export default PaymentFooter
