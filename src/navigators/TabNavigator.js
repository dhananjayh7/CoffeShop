import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import CustomIcons from '../components/CustomIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavoritesScreen from '../screens/FavoritesScreen'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator 
        screenOptions=
        {{
            headerShown:false, 
            tabBarHideOnKeyboard:true,
            tabBarShowLabel:false,
            tabBarStyle:styles.tabBarStyle,
            tabBarBackground:()=>{
                <BlurView overlayColor='' blurAmount={15} style={styles.blurViewStyle}/>
            }
        }}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon:({focused,color,size})=>(
            <CustomIcons name="home" size={25} color={ focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
        )
      }}></Tab.Screen>
      <Tab.Screen name='Cart' component={CartScreen} options={{
        tabBarIcon:({focused,color,size})=>(
            <CustomIcons name="cart" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
        )
      }}></Tab.Screen>
      <Tab.Screen name='Favorite' component={FavoritesScreen} options={{
        tabBarIcon:({focused,color,size})=>(
            <CustomIcons name="like" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
        )
      }}></Tab.Screen>
      <Tab.Screen name='History' component={OrderHistoryScreen} options={{
        tabBarIcon:({focused,color,size})=>(
            <CustomIcons name="bell" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
        )
      }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle:{
        height:80,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent'
    },
    blurViewStyle:{
        top:0,
        bottom:0,
        left:0,
        right:0,
        position:'absolute'
    }
})