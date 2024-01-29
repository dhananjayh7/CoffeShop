import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CARD_WIDTH = Dimensions.get('window').width*0.23

const CoffeeCard = ({name, id, index, type, rosted, imagelink_square, special_ingredient, average_rating, price, buttonPressHandler}) => {
    console.log('first,',name)
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default CoffeeCard