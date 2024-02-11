import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBGIcon from './GradientBGIcon'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import CustomIcons from './CustomIcons'

const ImageBackGroundInfo = ({
  EnableBackHandler,
  ImageLinkPortrate, 
  type, 
  id, 
  favorite, 
  name, 
  special_ingridient, 
  Ingridient, 
  average_rating, 
  rating_count, roasted, backHandler, toggleFavorite}) => {

  return (
    <View>
      <ImageBackground 
        source={ImageLinkPortrate}
        style = {styles.ItemBackGroundImage}
      >
        {
          EnableBackHandler?
          <View style={styles.imageHeaderContainerWithBack}>
            <TouchableOpacity onPress={backHandler}>
              <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>toggleFavorite(favorite, type, id)}>
            <GradientBGIcon 
                  name='like' 
                  color={favorite?COLORS.primaryRedHex:COLORS.primaryLightGreyHex} 
                  size={FONTSIZE.size_16} />
            </TouchableOpacity>
          </View>
          : 
          <View style={styles.imageHeaderContainerWithoutBack}>
            <TouchableOpacity onPress={()=>toggleFavorite(favorite, type, id)}>
             <GradientBGIcon 
                  name='like' 
                  color={favorite?COLORS.primaryRedHex:COLORS.primaryLightGreyHex} 
                  size={FONTSIZE.size_16} />
            </TouchableOpacity>
          </View>
        }
        <View style={styles.imageInFooterContainer}>
          <View style={styles.imageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
                    <View>
                      <Text style={styles.ItemNameText}>{name}</Text>
                      <Text style={styles.ItemSubText}>{special_ingridient}</Text>
                    </View>
                    <View style={styles.ItemPropertiesContainer}>
                      <View style={styles.ProperFirst}>
                        <CustomIcons name={type=='Bean'?'bean':'beans'} 
                        size={type=='Bean'?FONTSIZE.size_18:FONTSIZE.size_24}
                        color = {COLORS.primaryOrangeHex}
                        />
                        <Text style={[styles.PropertyTextFirst,{marginTop:type=='Bean'?Spacing.space_2 + Spacing.space_4:0,}]}>{type}</Text>
                      </View>
                      <View style={styles.ProperFirst}>
                        <CustomIcons name={type=='Bean'?'location':'drop'} 
                          size={FONTSIZE.size_16}
                          color = {COLORS.primaryOrangeHex}
                        />
                        <Text style={[styles.PropertyTextFirst,{marginTop:Spacing.space_2 + Spacing.space_4}]}>{Ingridient}</Text>
                      </View>
                    </View>
            </View>
            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <CustomIcons name={'star'} color={COLORS.primaryOrangeHex} size={FONTSIZE.size_20}/>
                <Text style={styles.Rating_Text}>{average_rating}</Text>
                <Text style={styles.Rating_Count_Text}>({rating_count})</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
        </View>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  ItemBackGroundImage:{
    width:'100%',
    aspectRatio:20/25,
    justifyContent:'space-between'
  },
  imageHeaderContainerWithBack:{
    padding:Spacing.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  imageHeaderContainerWithoutBack:{
    padding:Spacing.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  imageInFooterContainer:{
    paddingVertical:Spacing.space_24,
    paddingHorizontal:Spacing.space_30,
    backgroundColor:COLORS.primaryBlackRGBA,
    borderTopLeftRadius:BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  imageInfoInnerContainer:{
    justifyContent:'space-between',
    gap: Spacing.space_15,
  },
  InfoContainerRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  ItemPropertiesContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:Spacing.space_20
  },
  ItemNameText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  ItemSubText:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  ProperFirst:{
    height:55,
    width:55,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDERRADIUS.radius_15,
    backgroundColor:COLORS.primaryBlackHex,
  },
  PropertyTextFirst:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  RatingContainer:{
    flexDirection:'row',
    gap:Spacing.space_10,
    alignItems:'center'
  },
  Rating_Text:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  Rating_Count_Text:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,

  },
  RoastedContainer:{
    height:55,
    width:55*2 + Spacing.space_20, 
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDERRADIUS.radius_15,
    backgroundColor:COLORS.primaryBlackHex,
  },
  RoastedText:{
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  }
})

export default ImageBackGroundInfo
