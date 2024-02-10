import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from 'zustand'

const DetailsScreen = ({navigation, route}) => {
  console.log('route', route.params)
  const ItemOfIndex = useStore((state) =>
    route.params.type == ''? state.CoffeeList : state.BeanList
  )[route.params.index];
  return (
    <View style={styles.screenContainer}>
      <Text>DetailsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer:{
    
  },
})

export default DetailsScreen
