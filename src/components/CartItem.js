import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'

const CartItem = ({id, name, imagelink_square, special_ingredient, roasted, prices, type, incrementCartItmQtyHandle, decrementCartItmQtyHandle}) => {
  return (
    <View>
      {
        prices?.length != 1?
        (
            <LinearGradient
              start={{x:0, y:0}}
              end={{x:1, y:1 }}
              colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
              style={styles.cartItemLinearGredint}
            >
                <View style={styles.cartItemRow}>
                    <Image source={imagelink_square} style={styles.cartItemImage}/>
                    <View style={styles.cartItemnfo}>
                        <View>
                            <Text style={styles.cartItemName}>{name}</Text>
                            <Text style={styles.cartItemSpecialIngr}>{special_ingredient}</Text>
                        </View>
                        <View style={styles.roastedContainer}>
                            <Text style={styles.roastedText}>{roasted}</Text>
                        </View>
                    </View>
                </View>
                {
                    prices.map((data, index) =>(
                        <View 
                            style={styles.cartItmSizeContainer}
                            key={index.toString()}>
                                <View style={styles.cartItmSizeValueContainer}>
                                    <View style={styles.sizeBox}>
                                        <Text style={[styles.sizeTex,{fontSize: type=='bean'? FONTSIZE.size_12: FONTSIZE.size_16}]}>{data.size}</Text>
                                    </View>
                                </View>
                        </View>
                    ))
                }      
            </LinearGradient>
        )
        :(
            <></>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
    cartItemLinearGredint:{
        flex: 1,
        gap: Spacing.space_12,
        padding: Spacing.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cartItemRow:{
        flexDirection:'row',
        gap: Spacing.space_12,
        flex: 1,
    },
    cartItemImage:{
        height: 130,
        width: 130,
        borderRadius:BORDERRADIUS.radius_25
    },
    cartItemnfo:{
        flex: 1,
        paddingVertical: Spacing.space_4,
        justifyContent: 'space-between',
    },
    cartItemName:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    cartItemSpecialIngr:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    roastedContainer:{
        height: 50,
        width: 50*2 + Spacing.space_15,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: COLORS.primaryDarkGreyHex,

    },
    roastedText:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    cartItmSizeContainer:{
        flex:1,
        alignItems:'center',
        gap: Spacing.space_20,
        flexDirection:'row',
        justifyContent:'center'
    },
    cartItmSizeValueContainer:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    sizeBox:{
        backgroundColor:COLORS.primaryBlackHex,
        height:40,
        width:100,
        borderRadius:BORDERRADIUS.radius_10,
        justifyContent:'center',
        alignItems:'center'
    },
    sizeTex:{
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    }
})

export default CartItem