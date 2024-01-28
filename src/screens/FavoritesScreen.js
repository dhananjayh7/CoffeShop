import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcons from '../components/CustomIcons'

const FavoritesScreen = () => {
  return (
    <View>
      <Text>FavoritesScreen</Text>
      <CustomIcons name='home' size={25}/>
    </View>
  )
}

const styles = StyleSheet.create({})

export default FavoritesScreen
