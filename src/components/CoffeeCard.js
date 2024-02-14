import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import CustomIcons from './CustomIcons'
import BGIcon from './BGIcon'

const CARD_WIDTH = Dimensions.get('window').width*0.23

const CoffeeCard = ({name, id, index, type, roasted, imagelink_square, special_ingredient, average_rating, price, buttonPressHandler}) => {
    // console.log('first,',name)
  return (
    <LinearGradient
      start={{x:0, y:0}}
      end={{x:1, y:1}}
      style={styles.CarLinearGradCont}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground  source={imagelink_square} style={styles.CardImageBG} resizeMode='cover'>
        <View style={styles.cardRatingContainer}>
          <CustomIcons name='star' 
              color={COLORS.primaryOrangeHex} 
              size={FONTSIZE.size_16}/>
          <Text style={styles.cardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}> {name}</Text>
      <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.cardPriceCurrency}> $ <Text style={styles.cardPrice}>{price.price}</Text></Text>
        <TouchableOpacity onPress={()=>{buttonPressHandler({
                    id: id, 
                    index: index, 
                    name: name, 
                    roasted: roasted, 
                    imagelink_square : imagelink_square, 
                    special_ingredient: special_ingredient, 
                    type: type, 
                    prices: [{...price, quantity:1}],
                  })}}>
          <BGIcon 
            color= {COLORS.primaryWhiteHex}
            name= {'add'}
            BGColor= {COLORS.primaryOrangeHex}
            size= {FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  CarLinearGradCont:{
    padding:Spacing.space_15,
    borderRadius:BORDERRADIUS.radius_25,
    // justifyContent:'center',
    // alignItems:'center'

  },
  CardImageBG:{
    width : CARD_WIDTH,
    height : CARD_WIDTH,
    borderRadius : BORDERRADIUS.radius_20,
    marginBottom : Spacing.space_15,
    overflow: 'hidden'
  },
  cardRatingContainer:{
    flexDirection:'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems:'center',
    justifyContent:'center',
    gap: Spacing.space_10,
    paddingHorizontal:Spacing.space_15,
    position:'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius:BORDERRADIUS.radius_20,
    top:0,
    right:0
  },
  cardRatingText:{
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex,
    lineHeight:22,
    fontSize:FONTSIZE.size_14,
  },
  cardTitle:{
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_16,
  },
  cardSubTitle:{
    fontFamily:FONTFAMILY.poppins_light,
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_10,
  },
  CardFooterRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:Spacing.space_15,
  },
  cardPriceCurrency:{
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryOrangeHex,
    fontSize:FONTSIZE.size_18,
  }, 
  cardPrice:{
    color:COLORS.primaryWhiteHex,

  }
  
})

export default CoffeeCard