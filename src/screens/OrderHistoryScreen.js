import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PopUpAnimation from '../components/PopUpAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'

const OrderHistoryScreen = ({navigation}) => {
  const OrderHistoryList = useStore((state) => state.OrderHistoryList)
  const tabBarHight = useBottomTabBarHeight();
  const [showAnimate, setShowAnimate] = useState(false)
  
  const navigationHandler = ({index, id, type}) =>{
    console.log('id', index, id, type)
       navigation.navigate('Details',{index, id, type})
  }
  const buttonPressHandler = () =>{
    setShowAnimate(true)
    setTimeout(()=>{
      setShowAnimate(false)
    },2000)
  }
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      {
        showAnimate?
        <PopUpAnimation 
          style = {styles.LottiAnimation}
          source = {require('../lottie/download.json')}
        />
        :<></>
      }
      <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {styles.scrollViewFlex}
      >
        <View style={[styles.scrollViewInnerView,{marginBottom: tabBarHight}]}>
          <View style={styles.itemContainer}>
           <HeaderBar title='Order History' />
           {
              
              OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title='No Order History'/>
              )
            :
            (
              <View style={styles.ListItemContainer}>
                {
                  OrderHistoryList.map((data, index)=>(
                   <OrderHistoryCard 
                      key={index.toString()} 
                      navigationHandler = {navigationHandler} 
                      OrderDate = {data.OrderDate}
                      CartListPrice = {data.CartListPrice}
                      CartList = {data.CartList}
                    />
                  ))
                }
              </View>
             )
           }
          </View>
          {
            OrderHistoryList.length >0 ? (
              <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={()=>{
                    buttonPressHandler()
                  }}  
                >
                <Text style={styles.downloadBtnText}>Download</Text>
              </TouchableOpacity>
            ):(
              <></>
            )

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
    gap: Spacing.space_30
  },
  LottiAnimation:{
    height: 250,
  },
  downloadButton:{
    marginHorizontal: Spacing.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing.space_36 * 1.6,
    borderRadius: BORDERRADIUS.radius_20,
    marginTop:'5%',
    marginBottom: '5%'
  },
  downloadBtnText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  }
})

export default OrderHistoryScreen
