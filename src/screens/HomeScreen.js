import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'

const getCategoriesFromData = (data) =>{
  let temp ={}
  for(let i=0; i<data.length; i++){
    if(temp[data[i].name]==undefined){
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}
const getCoffee = (category, data) =>{
   if(category == "All"){
    return data;
   }else{
    let cofeelist = data.filter((item) => item.name == category);
    return cofeelist;
   }

}

const HomeScreen = () => {
  const CoffeeList = useStore((state) => state.CoffeeList)
  const BeanList = useStore((state) => state.BeanList)
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index:0,
    category:categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffee(categoryIndex.category, CoffeeList))
  const tabBarHeight = useBottomTabBarHeight()
  // console.log("cofeeList", categories) 
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewStyle}>
      <HeaderBar title="Home"/>
      <Text style={styles.ScreenTitle}>Find the best{'\n'}cofee for you</Text>
      {/* Search Input*/}
      <View style={styles.SearchInputContainer}> 
        <TouchableOpacity onPress={()=>{}}>
          <CustomIcons 
            style={styles.CustomIcons}
            name="search" 
            size = {FONTSIZE.size_18} 
            color = {searchText.length>0? COLORS.primaryOrangeHex:COLORS.primaryGreyHex}/>
        </TouchableOpacity>
          <TextInput 
            placeholder='Find Your Cofee...' 
            value={searchText} 
            onChangeText={text =>setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
      </View>
      {/* Category scroller */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle= {styles.CategoryScrollViewStyle}
        >
          {categories.map((data,index) =>(
            <View key={index.toString()} style = {styles.categoryScroolViewContainer}>
              <TouchableOpacity>
              <Text
                style={[styles.categoryTextActive, categoryIndex.index == index ?{} : {}]}>
                {data}
              </Text>
              {categoryIndex.index == index ?(
                <View style={styles.ActiveCategory}></View>
              ):(
                <></>
              )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewStyle:{
    flexGrow:1,
  },
  ScreenTitle:{
    fontSize:FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingLeft:Spacing.space_30
  },
  SearchInputContainer:{
    flexDirection:'row',
    margin: Spacing.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems:'center',
  },
  CustomIcons:{
    marginHorizontal: Spacing.space_20
  },
  textInputContainer:{
    flex:1,
    height: Spacing.space_20 *3,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle:{

  }
})

export default HomeScreen