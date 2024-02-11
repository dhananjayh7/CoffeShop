import {create} from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
    persist((set,get) => ({
        CoffeeList: CoffeeData,
        BeanList: BeansData,
        FavoritesList:[],
        CartList:[],
        OrderHistoryList:[],
        CartPrice: 0,
        addToCart:(cartItem) => 
            set(
              produce(state =>{
                let found = false;
                for(let i=0; i < state.CartList.length; i++){
                    if(state.CartList[i].id == cartItem.id){
                        found = true;
                        let size = false;
                        for(let j = 0; j< state.CartList[i].prices.length; j++){
                            if(state.CartList.prices[j].size == cartItem.prices[0]){
                                size = true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                        if(size == false){
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].price.sort((a, b) => {
                            if(a.size > b.size){
                                return -1;
                            }
                            if(a.size < b.size){
                                return 1;
                            }
                            return 0;
                        } );
                        break;
                    }
            }
            if(found == false){
             state.CartList.push(cartItem);   
            }
        })),
        calculateCartPrice: () => set(produce (state =>{
            let totalPrice = 0;
            for(let i = 0;i < state.CartList.length; i++){
                let tempPrice = 0;
                for(let j=0; j< state.CartList[i].prices.length; j++){
                     tempPrice = temp + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity
                }
                state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
                totalPrice = totalPrice + tempPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();

        })),
        addToFavoriteList : (type, id) => set(produce (state =>{
            if(type == 'Coffee'){
                for(let i=0; i< state.CoffeeList.length; i++){
                    if(state.CoffeeList[i].id == id){
                        if(state.CoffeeList[i].favourite == false){
                            state.CoffeeList[i].favourite = true;
                            state.FavoritesList.unshift(state.CoffeeList[i])
                        }
                        break;
                    }
                }
            }else  if(type == 'Bean'){
                for(let i=0; i< state.BeanList.length; i++){
                    if(state.BeanList[i].id == id){
                        if(state.BeanList[i].favourite == false){
                            state.BeanList[i].favourite = true;
                            state.FavoritesList.unshift(state.BeanList[i])
                        }
                        break;
                    }
                }
            }
        })),
        deleteFromFavorite : (type, id) => set(produce (state =>{
            if(type == 'Coffee'){
                for(let i=0; i< state.CoffeeList.length; i++){
                    if(state.CoffeeList[i].id == id){
                        if(state.CoffeeList[i].favourite == true){
                            state.CoffeeList[i].favourite = false;
                        }
                        break;
                    }
                }
            } else  if(type == 'Bean'){
                for(let i=0; i< state.BeanList.length; i++){
                    if(state.BeanList[i].id == id){
                        if(state.BeanList[i].favourite == true){
                            state.BeanList[i].favourite = false;
                        }
                        break;
                    }
                }
            }
            let spiceIndex = -1;
            for(let i=0; i< state.FavoritesList.length ;i++){
                if(state.FavoritesList[i].id == id){
                    spiceIndex = i;
                    break;
                }
            }
            state.FavoritesList.splice(spiceIndex, 1);
        }))
    }), {
            name: 'cofee-app', 
            storage: createJSONStorage(()=> AsyncStorage),
    }),
)