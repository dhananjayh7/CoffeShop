import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcons from '../components/CustomIcons'
import CoffeeCard from '../components/CoffeeCard'

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

const HomeScreen = ({navigation}) => {
  const CoffeeList = useStore((state) => state.CoffeeList)
  const BeanList = useStore((state) => state.BeanList)
  const addToCart = useStore((state) => state.addToCart)
  const calculateCartPrice = useStore((state) => state.calculateCartPrice)

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index:0,
    category:categories[0],
  });
  const ListRef = useRef(<FlatList />)
  const [sortedCoffee, setSortedCoffee] = useState(getCoffee(categoryIndex.category, CoffeeList))
  const tabBarHeight = useBottomTabBarHeight()
  // console.log("cofeeList", sortedCoffee) 
  const searcCofee = (search) =>{
    if(search != ''){
      ListRef?.current?.scrollToOffset({
        animated:true,
        offset:0,
      })
      setCategoryIndex({index:0,category:categories[0]})
      setSortedCoffee([...CoffeeList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  }

  const CoffeeCardAddToCart = (data) =>{
    console.log('data',data)
    addToCart({
        id: data.id, 
        index: data.index, 
        name:data.name, 
        roasted:data.roasted, 
        imagelink_square :data.imagelink_square, 
        special_ingredient: data.special_ingredient, 
        type: data.type, 
        prices: data.prices,
      })
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${data.name} is Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  const resetSearchCoffee = () =>{
    ListRef?.current?.scrollToOffset({
      animated:true,
      offset:0,
    })
    setCategoryIndex({index:0,category:categories[0]})
    setSortedCoffee([...CoffeeList]);
    setSearchText('')
  }
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewStyle}>
      <HeaderBar title="Home"/>
      <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>
      {/* Search Input*/}
      <View style={styles.SearchInputContainer}> 
        <TouchableOpacity onPress={()=>{searcCofee(searchText)}}>
          <CustomIcons 
            style={styles.CustomIcons}
            name="search" 
            size = {FONTSIZE.size_18} 
            color = {searchText.length>0? COLORS.primaryOrangeHex:COLORS.primaryGreyHex}/>
        </TouchableOpacity>
          <TextInput 
            placeholder='Find Your Coffee...' 
            value={searchText} 
            onChangeText={text =>{
              setSearchText(text);
              searcCofee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
          {searchText.length > 0 ? ( 
            <TouchableOpacity onPress={()=>{resetSearchCoffee()}}>
              <CustomIcons style={styles.CustomIcons} name= 'close' size = {FONTSIZE.size_16} color={COLORS.primaryLightGreyHex}/>
            </TouchableOpacity> ) : (<></>)}
      </View>
      {/* Category scroller */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle= {styles.CategoryScrollViewStyle}
        >
          {categories?.map((data,index) =>(
            <View key={index.toString()} style = {styles.categoryScroolViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={()=>{
                  ListRef?.current?.scrollToOffset({
                    animated:true,
                    offset:0,
                  })
                  setCategoryIndex({index:index, category:categories[index]})
                  setSortedCoffee(getCoffee(categories[index], CoffeeList))
                }}
              >

              <Text
                style={[styles.categoryTextActive, categoryIndex.index == index ?{color: COLORS.primaryOrangeHex} : {}]}>
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
        {/* Cofee Flatlist */}
        <FlatList 
          ref={ListRef}
          data={sortedCoffee}
          ListEmptyComponent={
            <View style={styles.emptyListComponent}> 
              <Text style={styles.categoryTextActive}>No Coffeelist Found</Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator= {false}
          contentContainerStyle = {styles.FlatlistContainer}
          keyExtractor={item => item.id}
          renderItem={({item})=>{
            // console.log(item.name)
            return (     
            <TouchableOpacity onPress={()=>{navigation.push('Details',{
                index : item.index,
                id: item.id,
                type: item.type,
            })}}>
                <CoffeeCard 
                  name={item.name} 
                  id = {item.id}
                  index = {item.index}
                  type =  {item.type}
                  roasted = {item.roasted}
                  imagelink_square = {item.imagelink_square }
                  special_ingredient= {item.special_ingredient}
                  average_rating = {item.average_rating} 
                  price = {item.prices[2]}
                  buttonPressHandler = {CoffeeCardAddToCart}
               />
            </TouchableOpacity>
            )
          }}
        />
        <Text style={styles.CofeeBeanTitle}>Coffee Beans</Text>
         {/* Bean Flatlist */}
         <FlatList 
          data={BeanList}
          horizontal
          showsHorizontalScrollIndicator= {false}
          contentContainerStyle = {[styles.FlatlistContainer,{marginBottom:tabBarHeight}]}
          keyExtractor={item => item.id}
          renderItem={({item})=>{
            // console.log(item.name)
            return (     
            <TouchableOpacity onPress={()=>{navigation.push('Details',{
              index : item.index,
              id: item.id,
              type: item.type,
          })}}>
                <CoffeeCard 
                  name={item.name} 
                  id = {item.id}
                  index = {item.index}
                  type =  {item.type}
                  rosted = {item.rosted}
                  imagelink_square = {item.imagelink_square }
                  special_ingredient= {item.special_ingredient}
                  average_rating = {item.average_rating} 
                  price = {item.prices[2]}
                  buttonPressHandler = {CoffeeCardAddToCart}
               />
            </TouchableOpacity>
            )
          }}
        />
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
    paddingHorizontal: Spacing.space_20,
    marginBottom: Spacing.space_20,
  },
  categoryScroolViewContainer:{
    paddingHorizontal: Spacing.space_15
  },
  ActiveCategory:{
    height: Spacing.space_10,
    width: Spacing.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryScrollViewItem:{
    alignItems:'center'
  },
  categoryTextActive:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: Spacing.space_4
  },
  FlatlistContainer:{
    gap: Spacing.space_20,
    paddingVertical: Spacing.space_20,
    paddingHorizontal: Spacing.space_30
  },
  CofeeBeanTitle:{
    fontSize: FONTSIZE.size_18,
    marginLeft:Spacing.space_30,
    marginTop:Spacing.space_20,
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.secondaryLightGreyHex,
  },
  emptyListComponent:{
    width: Dimensions.get('window').width - Spacing.space_30 * 2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:Spacing.space_36 * 3.6,
  }
})

export default HomeScreen