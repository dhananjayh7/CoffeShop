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
                        console.log('cart list',state.CartList[i])
                        for(let j = 0; j< state.CartList[i].prices.length; j++){
                            if(state.CartList[i].prices[j].size == cartItem.prices[0]){
                                size = true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                        if(size == false){
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].prices.sort((a, b) => {
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
                     tempPrice = tempPrice + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity
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
        })),
        incrementCart_itm_qty : (id, size) => set(produce(state =>{
            for(let i=0; i< state.CartList.length; i++){
                if(state.CartList[i].id == id){
                    for(let j=0; j< state.CartList[i].prices.length; j++){
                        if(state.CartList[i].prices[j].size == size){
                            state.CartList[i].prices[j].quantity++;
                            break;
                        }
                    }
                }
            }
        })),
        decrementCart_itm_qty : (id, size) => set(produce (state =>{
            for(let i=0; i< state.CartList.length; i++){
                if(state.CartList[i].id == id){
                    for(let j=0; j< state.CartList[i].prices.length; j++){
                        if(state.CartList[i].prices[j].size == size){
                            if(state.CartList[i].prices.length > 1){
                                if(state.CartList[i].prices[j].quantity>1){
                                    state.CartList[i].prices[j].quantity--;
                                }else{
                                    state.CartList[i].prices.splice(j,1); 
                                }
                            }else{
                                if(state.CartList[i].prices[j].quantity>1){
                                    state.CartList[i].prices[j].quantity--;
                                }else{
                                    state.CartList.splice(i,1); 
                                }
                            }
                            break;
                        }
                    }
                }
            }
        })),
        orderHistoryListFromCart: () => set(produce (state =>{
            let temp = state.CartList.reduce((accumulator, CurrentValue) =>
                accumulator + parseFloat(CurrentValue.ItemPrice),
                0,
            );
            if(state.OrderHistoryList.length > 0){
                state.OrderHistoryList.unshift({
                    OrderDate: new Date().toDateString()+ " " + new Date().toLocaleTimeString(),
                    CartList: state.CartList,
                    CartListPrice: temp.toFixed(2).toString(),
                })
            }else{
                state.OrderHistoryList.push({
                    OrderDate: new Date().toDateString()+ " " + new Date().toLocaleTimeString(),
                    CartList: state.CartList,
                    CartListPrice: temp.toFixed(2).toString(),
                })
            }
            state.CartList = [];
        })) 
    }), {
            name: 'cofee-app', 
            storage: createJSONStorage(()=> AsyncStorage),
    }),
)