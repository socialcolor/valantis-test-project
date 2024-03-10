import { configureStore } from '@reduxjs/toolkit';
import {productSlice} from './product-process/product-process'
import { filterSlice } from './filter-process/filter-process';
import createAPI from '../services/api';

export const api = createAPI();

export const store = configureStore({
    reducer:{productSlice, filterSlice},
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: {
                extraArgument: api
            }
        })
    }
)
