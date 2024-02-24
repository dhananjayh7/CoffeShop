import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, Spacing } from '../theme/theme'
import ImageBackGroundInfo from './ImageBackGroundInfo'

const FavouriteItmCart = ({id, imagelink_portrait, special_ingredient, name, type, ingredients, average_rating, ratings_count, roasted , description , favourite , toggleFavorite }) => {
  return (
    <View style={styles.CardContainer}>
         <ImageBackGroundInfo 
            // EnableBackHandler={true}
            ImageLinkPortrate={imagelink_portrait} 
            type={type} 
            id={id} 
            favorite={favourite} 
            name={name} 
            special_ingridient={special_ingredient} 
            Ingridient={ingredients} 
            average_rating={average_rating} 
            rating_count={ratings_count} 
            roasted={roasted} 
            toggleFavorite={toggleFavorite}            
         />
         <LinearGradient
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            colors = {[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.containerLinearGradient}
         >
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.descDataText}>{description}</Text>
         </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    CardContainer:{
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden'
    },
    containerLinearGradient:{
        gap: Spacing.space_10,
        padding: Spacing.space_20,
    },
    descTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
    },
    descDataText:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    }
})

export default FavouriteItmCart