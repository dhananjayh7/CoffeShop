import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'

const OrderItemCard = ({ type, name, imagelink_square, special_ingredient, prices, ItemPrice }) => {
  
    return (
        <LinearGradient
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style = {styles.cardLinearGradient}
        >
            <View style={styles.cardInfoContainer}>
                <View style={styles.cardImageContainer }>
                    <Image source={imagelink_square} style={styles.imageStyle}/>
                    <View>
                        <Text style={styles.cardName}>{name}</Text>
                        <Text style = {styles.specialIngr}>{special_ingredient}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.cardCurrency}>$ <Text style={styles.cardPrice}>{ItemPrice}</Text></Text>
                </View>
            </View>
            {
                prices.map((data, index) =>(
                    <View key={index.toString()} style={styles.cardTblRow}>
                        <View style={styles.cardTblRow }>
                            <View style={styles.SizeBoxLeft}>
                                <Text style={[styles.SizeText,
                                    {fontSize:type==='Bean'?FONTSIZE.size_12: FONTSIZE.size_16}]
                                    
                                    }
                               >{data.size}
                            </Text>
                            </View>
                            <View style={styles.priceBoxRight}>
                                <Text style={styles.priceCurrency}>
                                  {data.currency}  <Text style={styles.priceText}>{data.price}</Text>
                                </Text>
                            </View> 
                        </View>
                        <View styles={styles.cardTblRow}>
                            <Text style={styles.cardQty}>
                                X <Text style={styles.priceText}>{data.quantity}</Text>
                            </Text>
                            <Text style={styles.cardQty}>$ {(data.quantity * data.price).toFixed(2).toString()}</Text>
                        </View>
                    </View>
                ))
            }
        </LinearGradient>
  )
}

const styles = StyleSheet.create({
    cardLinearGradient:{
        gap: Spacing.space_20,
        padding: Spacing.space_20,
        borderRadius: BORDERRADIUS.radius_25,

    },
    cardInfoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    cardImageContainer:{
        flexDirection: 'row',
        gap: Spacing.space_20,
        alignItems: 'center',
    },
    imageStyle:{
        height: 90,
        width: 90,
        borderRadius: BORDERRADIUS.radius_15,
    },
    cardName:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex 
    },
    specialIngr:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex 
    },
    cardCurrency:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryOrangeHex 
    },
    cardPrice:{
        color: COLORS.primaryWhiteHex,
    },
    cardTblRow: {
        flex :1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    SizeBoxLeft: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 0.5,
        borderTopLeftRadius: BORDERRADIUS.radius_10,
        borderBottomLeftRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth:1,
        borderRightColor: COLORS.primaryGreyHex
    },
    priceBoxRight: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 0.5,
        borderTopRighttRadius: BORDERRADIUS.radius_10,
        borderBottomRightRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth:1,
        borderLefttColor: COLORS.primaryGreyHex,
    },
    priceCurrency: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex 
    },
    SizeText:{
        fontFamily: FONTFAMILY.poppins_semibold,
        // fontSize: FONTSIZE.size_20,
        color: COLORS.primaryLightGreyHex
    },
    priceText: {
        color: COLORS.primaryWhiteHex,
    },
    cardQty: {
        flex:1,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex  
    },
    cardQty:{
        flex:1,
        textAlign:'center',
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex
    }
    
})

export default OrderItemCard