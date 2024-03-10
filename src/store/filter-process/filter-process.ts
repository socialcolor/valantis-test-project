import { createSlice } from '@reduxjs/toolkit';
import { Filter } from '../../types/state';
import { fetchLoadFiltersAction } from '../api-actons';

const initialState: Filter = {
    product: [],
    price: [],
    brand: [],
    loadingStatus: true,
    activeFilter: {
        name: '',
        value: '',
    }
}

export const filterProcess = createSlice({
    name: 'FILTER',
    initialState,
    reducers: {
        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        resetActiveFilter: (state) => {
            state.activeFilter = {
                name: '',
                value: '',
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLoadFiltersAction.fulfilled, (state, action) => {
                if (action.payload) {
                    state.product = action.payload.product;
                    state.price = action.payload.price.sort((a, b) => a - b);
                    state.brand = action.payload.brand;
                    state.loadingStatus = action.payload.loadingStatus;
                }
            })
    }
})

export const filterSlice = filterProcess.reducer;

export const { setActiveFilter, resetActiveFilter } = filterProcess.actions;
