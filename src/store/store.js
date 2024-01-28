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

    }), {
            name: 'cofee-app', 
            storage: createJSONStorage(()=> AsyncStorage),
    }),
)