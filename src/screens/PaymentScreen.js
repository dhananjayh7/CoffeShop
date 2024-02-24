import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import GradientBGIcon from '../components/GradientBGIcon'
import PaymentMethod from '../components/PaymentMethod'
import PaymentFooter from '../components/PaymentFooter'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcons from '../components/CustomIcons'
import { useStore } from '../store/store'
import PopUpAnimation from '../components/PopUpAnimation'

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true, 
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false, 
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false, 
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false, 
  },
]
const PaymentScreen = ({navigation, route}) => {
  const [paymentMode, setPaymentMode] = useState('Credit Card')
  const [showAnimate, setShowAnimate] = useState(false)

  const orderHistoryListFromCart = useStore((state) => state.orderHistoryListFromCart)
  const calculateCartPrice = useStore((state) => state.calculateCartPrice)  
  
  const buttonPressHandler = () =>{
    setShowAnimate(true)
    orderHistoryListFromCart() 
    calculateCartPrice()
    setTimeout(()=>{
      setShowAnimate(false)
      navigation.navigate('History')
    },2000)
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      {
        showAnimate?
        <PopUpAnimation 
          style = {styles.LottiAnimation}
          source = {require('../lottie/successful.json')}
        />
        :<></>
      }
      <ScrollView
        showsVerticalScrollIndicator= {false}
        contentContainerStyle ={styles.scrollViewFlex}
      >
        <View style={styles.headerContainer }>
          <TouchableOpacity onPress={()=>{navigation.pop()}}>
              <GradientBGIcon 
                  name='left' 
                  color={COLORS.primaryLightGreyHex}  
                  size={FONTSIZE.size_16 }/>
          </TouchableOpacity>
          <Text style={styles.headerText}>Payments</Text>
          <View style={styles.emptyView}/>
        </View>
        <View style={styles.paymentOptionContainer}>
          <TouchableOpacity onPress={ ()=>{
            setPaymentMode('Credit Card')
          }}>
            <View style={[styles.creditCardContainer,
              {borderColor: paymentMode == 'Credit Card' ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            ]}>
            <Text style={styles.creditCardTitle}>
              Credit Card
            </Text>
            <View style= {styles.creditCardBg}>
              <LinearGradient
                start={{x:0, y:0}}
                end={{x:1, y:1}}
                style={styles.linearGradientStyle}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
              >
                <View style={styles.creditCardRow}>
                <CustomIcons name='chip' size= {FONTSIZE.size_20 *2} color = {COLORS.primaryOrangeHex}/>
                <CustomIcons name='visa' size= {FONTSIZE.size_30 *2} color = {COLORS.primaryOrangeHex}/>
                </View>
                <View style={styles.creditCardNO}>
                  <Text style={styles.creditCardNOText}>4255</Text>
                  <Text style={styles.creditCardNOText}>4334</Text>
                  <Text style={styles.creditCardNOText}>XXXX</Text>
                  <Text style={styles.creditCardNOText}>XXXX</Text>
                </View>
                <View style={styles.creditCardRow}>
                   <View style={styles.creditCardNameContainer}>
                      <Text style={styles.creditCardNameTitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.creditCardNameVal}>
                        Robert Wiliams
                      </Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.creditCardNameTitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.creditCardNameVal}>
                        02/34
                      </Text>
                    </View>
                </View>
              </LinearGradient>
            </View>
            </View>
          </TouchableOpacity>
          {
            PaymentList.map((data)=>(
              <TouchableOpacity 
                  key={data.name}
                  onPress={() =>{
                    setPaymentMode(data.name)
                  }}
                  >
                  <PaymentMethod 
                    paymentMode = {paymentMode}
                    name = {data.name}
                    icon =  {data.icon}
                    isIcon = {data.isIcon}
                  />
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
      <PaymentFooter 
        buttonPressHandler = {buttonPressHandler}
        buttonTitle={`Pay with This ${paymentMode}`} price={{price: route?.params?.amount, currency: '$'}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex:{
    flexGrow:1,
  },
  headerContainer:{
    paddingHorizontal: Spacing.space_24,
    paddingVertical: Spacing.space_15,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  headerText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex
  },
  emptyView:{
    height: Spacing.space_36,
    width: Spacing.space_36,
  },
  paymentOptionContainer:{
    gap: Spacing.space_15,
    padding:Spacing.space_15
  },
  creditCardContainer:{
    padding: Spacing.space_10,
    gap: Spacing.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3
  },
  creditCardTitle:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft : Spacing.space_10
  },
  creditCardBg:{
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  linearGradientStyle:{
    borderRadius: BORDERRADIUS.radius_25,
    gap: Spacing.space_36,
    paddingHorizontal: Spacing.space_15,
    paddingVertical: Spacing.space_10,
  },
  creditCardRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  creditCardNO:{
    flexDirection: 'row',
    gap: Spacing.space_10,
    alignItems: 'center',
  },
  creditCardNOText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: Spacing.space_4 
  },
  creditCardNameContainer:{
    alignItems:'flex-start'
  },
  creditCardDateContainer:{
    alignItems:'flex-end'
  },
  creditCardNameTitle:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  creditCardNameVal:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  LottiAnimation:{
    flex: 1,
  }
  
})

export default PaymentScreen
