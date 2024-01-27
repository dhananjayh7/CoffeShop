import { View, Text } from 'react-native'
import React from 'react'
import CustomIcons from './src/components/CustomIcons'

const App = () => {
  return (
    <View>
      <Text>Apps</Text>
      <CustomIcons name="search" size={26} />
    </View>
  )
}

export default App