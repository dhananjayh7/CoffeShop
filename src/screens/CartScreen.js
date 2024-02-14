import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, Spacing } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import CartItem from '../components/CartItem'

const CartScreen = ({navigation, route}) => {
  const CartList = useStore((state) => state.CartList)
  const CartPrice = useStore((state) => state.CartPrice)
  const incrementCart_itm_qty = useStore((state) => state.incrementCart_itm_qty)
  const decrementCart_itm_qty = useStore((state) => state.decrementCart_itm_qty)
  const calculateCartPrice = useStore((state) => state.calculateCartPrice)
console.log('length',CartList.length)
  const tabBarHeight = useBottomTabBarHeight()

  const PayHandle = () =>{
    navigation.push('Payment')
  }
  return (
    <View style={styles.screenContainer}> 
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {styles.scrollViewFlex}
      >
        <View style={[styles.scrollViewInnerView,{marginBottom:tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title='Cart' />
            {
              
                CartList.length == 0 ? (<EmptyListAnimation title='Cart is Empty'/>
                )
              :(
              <View style={styles.ListItemContainer}>
                {
                  CartList.map((data) =>(
                    <TouchableOpacity 
                      key={data.id }
                      onPress={()=>{}}>
                        <CartItem 
                          id = {data.id} 
                          name = {data.name} 
                          imagelink_square = {data.imagelink_square}
                          special_ingredient = {data.special_ingredient}
                          roasted = {data.roasted}
                          prices = {data.prices}
                          type = {data.type}
                          incrementCartItmQtyHandle ={()=>{}}
                          decrementCartItmQtyHandle = {()=>{}}
                        />
                    </TouchableOpacity>
                  ))
                }
              </View>
              )
            }
          </View>
          {
            CartList.length != 0 ?(
            <PaymentFooter 
                buttonPressHandler={()=>{
                  PayHandle()
                }}
                buttonTitle='Pay' 
                price={{price : CartPrice, currency : '$'}}
            />
            )
            :
            <></>
          }
        </View>
        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex:{
    flexGrow:1,
  },
  scrollViewInnerView:{
    flex:1,
    justifyContent:'space-between',
  },
  itemContainer:{
    flex:1,
  },
  ListItemContainer:{
    paddingHorizontal: Spacing.space_20,
    gap: Spacing.space_20
  }
})

export default CartScreen