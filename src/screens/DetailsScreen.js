import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import ImageBackGroundInfo from '../components/ImageBackGroundInfo'
import PaymentFooter from '../components/PaymentFooter'

const DetailsScreen = ({navigation, route}) => {
  console.log('route', route.params)
  const ItemOfIndex = useStore((state) =>
    route.params.type == 'Coffee'? state.CoffeeList : state.BeanList
  )[route.params.index];
  const addToFavoriteList = useStore((state) => state.addToFavoriteList)
  const deleteFromFavorite = useStore((state) => state.deleteFromFavorite)
  const [fullDesc, setFullDesk] = useState(false)
  const [price, setPrice] = useState(ItemOfIndex.prices[0])
  const addToCart = useStore((state) => state.addToCart)
  const backHandler = () =>{
    navigation.pop()
  }
  const toggleFavorite = (favourite, type, id ) =>{
    console.log('da',favourite, type, id)
    favourite? deleteFromFavorite(type, id): addToFavoriteList(type, id);
  }
  
  const addToCartHandle = (id, index, name, roaste, ImageLinkSquare, special_ingredient, type, price) =>{
    
  }
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {styles.ScrollViewFlex}
      >
        <ImageBackGroundInfo 
            EnableBackHandler={true}
            ImageLinkPortrate={ItemOfIndex.imagelink_portrait} 
            type={ItemOfIndex.type} 
            id={ItemOfIndex.id} 
            favorite={ItemOfIndex.favourite} 
            name={ItemOfIndex.name} 
            special_ingridient={ItemOfIndex.special_ingredient} 
            Ingridient={ItemOfIndex.ingredients} 
            average_rating={ItemOfIndex.average_rating} 
            rating_count={ItemOfIndex.ratings_count} 
            roasted={ItemOfIndex.roasted} 
            backHandler={backHandler} 
            toggleFavorite={toggleFavorite}   
        />
        <View style={styles.footerInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
           {
            fullDesc?(<TouchableWithoutFeedback onPress={()=>{ setFullDesk(prev =>!prev)}}>
              <Text style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback>)
            :(
            <TouchableWithoutFeedback onPress={()=>{ setFullDesk(prev =>!prev)}}>
              <Text style={styles.DescriptionText} numberOfLines={3}>{ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback>
           )}
           <Text style={styles.InfoTitle}>Size </Text>
           <View style={styles.SizeOuterContainer}>
              {
                ItemOfIndex.prices.map((data)=>(
                  <TouchableOpacity 
                    onPress={()=>setPrice(data)}
                    style={[styles.SizeBox,{borderColor:data.size == price.size ? COLORS.primaryOrangeHex: COLORS.primaryDarkGreyHex}]} key={data.size}>
                    <Text 
                        style={[styles.SizeText,
                            {
                               fontSize:ItemOfIndex.type=='bean'?FONTSIZE.size_14: FONTSIZE.size_16,
                               color: data.size == price.size ? COLORS.primaryOrangeHex: COLORS.secondaryLightGreyHex,
                            }]}>
                          {data.size}
                    </Text>
                  </TouchableOpacity>
                ))
              }
           </View>
        </View>
        <PaymentFooter 
          price={price}
          
          buttonPressHandler={()=>{}}
          buttonTitle = {'Add to Cart'}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
    justifyContent:'space-between'
    // backgroundColor:COLORS.primaryGreyHex
  },
  footerInfoArea:{
    padding: Spacing.space_20,
  },
  InfoTitle:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: Spacing.space_10,
  },
  DescriptionText:{
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: Spacing.space_30,
  },
  SizeOuterContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    gap:Spacing.space_20
  },
  SizeBox:{
    flex:1,
    backgroundColor:COLORS.primaryDarkGreyHex,
    alignItems:'center',
    justifyContent:'center',
    height:Spacing.space_24 *2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText:{
    fontFamily: FONTFAMILY.poppins_medium
  }
})

export default DetailsScreen
