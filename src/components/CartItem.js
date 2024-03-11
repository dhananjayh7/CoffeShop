import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import CustomIcons from './CustomIcons'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

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
                                        <Text style={[styles.sizeTex,{fontSize: type=='bean'? responsiveFontSize(FONTSIZE.size_12): responsiveFontSize(1.5)}]}>{data.size}</Text>
                                    </View>
                                    <Text style={styles.sizeCurrency}>  {data.currency}
                                    <Text style={styles.sizePrice}> {data.price}</Text></Text>
                                </View>
                                <View style={styles.cartItmSizeValueContainer}>
                                    <TouchableOpacity 
                                        onPress ={()=>{
                                            decrementCartItmQtyHandle(id, data.size)
                                        }}
                                        style= {styles.cartItemIcon}>
                                        <CustomIcons 
                                            name = 'minus'
                                            color = {COLORS.primaryWhiteHex}
                                            size = {responsiveFontSize(1)}
                                         />
                                    </TouchableOpacity>
                                    <View style={styles.cartItemQty}>
                                        <Text style={styles.cartItmQtyText}>
                                            {data.quantity}
                                        </Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            incrementCartItmQtyHandle(id, data.size)
                                        }}
                                        style= {styles.cartItemIcon}>
                                        <CustomIcons 
                                            name = 'add'
                                            color = {COLORS.primaryWhiteHex}
                                            size = {responsiveFontSize(1)}
                                         />
                                    </TouchableOpacity>
                                </View>
                        </View>
                    ))
                }      
            </LinearGradient>
        )
        :(
            <LinearGradient
                start={{x:0, y:0}}
                end={{x:1, y:1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.cartItemSingleLinearGredint}
            >
            <View>
                <Image source={imagelink_square} style={styles.cartItmSingleImg}/>
            </View>
            <View style={styles.cartItmSingleInfoContainer}>
                <View>
                    <Text style={styles.cartItemName}>{name}</Text>
                    <Text style={styles.cartItemSpecialIngr}>{special_ingredient}</Text>
                </View>
                <View style={styles.cartItemSingleValueContainer}>
                    <View style={styles.sizeBox}>
                        <Text style={[styles.sizeTex,{fontSize: type=='bean'? FONTSIZE.size_12: FONTSIZE.size_16}]}>{prices[0].size}</Text>
                    </View>
                    <Text style={styles.sizeCurrency}>{prices[0].currency}
                    <Text style={styles.sizePrice}>   {prices[0].price}</Text></Text>
                </View>
                <View style={styles.cartItmSingleQtyContainer}>
                            <TouchableOpacity 
                                onPress ={()=>{
                                    decrementCartItmQtyHandle(id, prices[0].size)
                                }}
                                style= {styles.cartItemIcon}>
                                <CustomIcons 
                                    name = 'minus'
                                    color = {COLORS.primaryWhiteHex}
                                    size = {responsiveFontSize(1)}
                                    />
                            </TouchableOpacity>
                            <View style={styles.cartItemQty}>
                                <Text style={styles.cartItmQtyText}>
                                    {prices[0].quantity}
                                </Text>
                            </View>
                            <TouchableOpacity 
                                onPress={()=>{
                                    incrementCartItmQtyHandle(id, prices[0].size)
                                }}
                                style= {styles.cartItemIcon}>
                                <CustomIcons 
                                    name = 'add'
                                    color = {COLORS.primaryWhiteHex}
                                    size = {responsiveFontSize(1)}
                                    />
                            </TouchableOpacity>
                </View>
            </View>
          </LinearGradient> 
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
        height: responsiveScreenHeight(18),
        width: responsiveScreenWidth(35),
        borderRadius:BORDERRADIUS.radius_25
    },
    cartItemnfo:{
        flex: 1,
        paddingVertical: Spacing.space_4,
        justifyContent: 'space-between',
    },
    cartItemName:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: responsiveFontSize(2.2),
        color: COLORS.primaryWhiteHex,
    },
    cartItemSpecialIngr:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: responsiveFontSize(FONTSIZE.size_2),
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
        height:responsiveScreenHeight(5),
        width:responsiveScreenWidth(20),
        borderRadius:BORDERRADIUS.radius_10,
        justifyContent:'center',
        alignItems:'center'
    },
    sizeTex:{
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    sizePrice:{
        color: COLORS.primaryWhiteHex,
    },
    sizeCurrency:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    cartItemIcon:{
        backgroundColor:COLORS.primaryOrangeHex,
        padding: responsiveFontSize(1.2),
        borderRadius: BORDERRADIUS.radius_8,
    },
    cartItemQty:{
        backgroundColor:COLORS.primaryBlackHex,
        width: responsiveScreenWidth(18),
        borderRadius:BORDERRADIUS.radius_10,
        borderWidth:2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems:'center',
        paddingVertical: Spacing.space_4,
    },
    cartItmQtyText:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    cartItemSingleLinearGredint:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.space_15,
        gap: Spacing.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cartItmSingleImg:{
        height: responsiveScreenHeight(18),
        width: responsiveScreenWidth(35),
        borderRadius:BORDERRADIUS.radius_25
    },
    cartItmSingleInfoContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',

    },
    cartItemSingleValueContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    cartItmSingleQtyContainer:{
        flexDirection:'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    }
})

export default CartItem