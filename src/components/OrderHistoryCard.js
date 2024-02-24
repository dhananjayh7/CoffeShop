import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import OrderItemCard from './OrderItemCard'

const OrderHistoryCard = ({navigationHandler, OrderDate , CartListPrice , CartList }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
            <Text style={styles.orderTitle}>Order Time</Text>
            <Text style={styles.orderTitleVal}>{OrderDate}</Text>
        </View>
        <View style={styles.priceContainer}>
            <Text style={styles.orderTitle}>Total Amount</Text>
            <Text style={styles.orderPriceTitleVal}>$ {CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {
            CartList.map((data, index) =>(
                <TouchableOpacity 
                        key={index.toString() + data.id}
                        onPress={()=>{
                            navigationHandler({index : data.index, id: data.id, type:data.type})
                        }}
                >
                    <OrderItemCard 
                        type= {data.type}
                        name = {data.name}
                        imagelink_square = {data.imagelink_square}
                        special_ingredient = {data.special_ingredient}
                        prices = {data.prices}
                        ItemPrice = {data.ItemPrice}
                    />
                </TouchableOpacity>
            ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
        gap: Spacing.space_10
    },
    cardHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        gap:Spacing.space_20,
        alignItems:'center'
    },
    orderTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex
    },
    orderTitleVal:{
        fontFamily: FONTFAMILY.poppins_light ,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex
    },
    priceContainer:{
         alignItems:'flex-end',
    },
    orderPriceTitleVal:{
        fontFamily: FONTFAMILY.poppins_medium ,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex
    },
    listContainer:{
        gap: Spacing.space_20
    }
})

export default OrderHistoryCard
