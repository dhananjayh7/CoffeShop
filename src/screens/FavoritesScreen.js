import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcons from '../components/CustomIcons'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, Spacing } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CartItem from '../components/CartItem'
import PaymentFooter from '../components/PaymentFooter'
import EmptyListAnimation from '../components/EmptyListAnimation'
import FavouriteItmCart from '../components/FavouriteItmCart'

const FavoritesScreen = ({navigation}) => {
  const FavoritesList = useStore((state) => state.FavoritesList)
  const tabBarHeight = useBottomTabBarHeight(); 

  const addToFavoriteList = useStore((state) => state.addToFavoriteList)
  const deleteFromFavorite = useStore((state) => state.deleteFromFavorite)

  const toggleFavorite = (favourite, type, id ) =>{
    favourite? deleteFromFavorite(type, id): addToFavoriteList(type, id);
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
            <HeaderBar title='Favourites' />
            {
              
              FavoritesList.length == 0 ? (<EmptyListAnimation title='No Favourites'/>
                )
              :(
              <View style={styles.ListItemContainer}>
                {
                  FavoritesList.map((data) =>(
                    <TouchableOpacity
                      key={data.id }
                      onPress={()=>{
                        navigation.push('Details',{
                          index: data.index,
                          id: data.id,
                          type: data.type,
                        })
                      }}>
                      <FavouriteItmCart 
                        id={data.id} 
                        imagelink_portrait = {data.imagelink_portrait}
                        special_ingredient = {data.special_ingredient}
                        name={data.name} 
                        type={data.type} 
                        ingredients = {data.ingredients}
                        average_rating= {data.average_rating} 
                        ratings_count = {data.ratings_count}
                        roasted = {data.roasted}
                        description = {data.description}
                        favourite = {data.favourite}
                        toggleFavorite = {toggleFavorite}
                      />
                    </TouchableOpacity>
                  ))
                }
              </View>
              )
            }
          </View>
         
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

export default FavoritesScreen
