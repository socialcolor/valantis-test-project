import { createSlice } from '@reduxjs/toolkit';
import { Products } from '../../types/state';
import { fetchLoadFiltredIdsAction, fetchLoadFiltredProductsAction, fetchLoadProductsAction } from '../api-actons';

const initialState: Products = {
    ferstLoad: true,
    ids: [],
    products: [],
    duplucates: 0,
    loadStep: 250,
    productsInPage: 50,
    pages: 0,
    currentPage: 1,
    loadingStatus: true,
    filred: false,
};

export const productProcess = createSlice({
    name: 'PRODUCT',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPages: (state, action) => {
            state.pages = action.payload;
        },
        incrementPage: (state) => {
            state.currentPage += 1;
        },
        decrementPage: (state) => {
            state.currentPage -= 1;
        },
        setFirstLoad: (state) => {
            state.ferstLoad = true;
            state.ids = [];
            state.products = [];
            state.duplucates = 0;
            state.pages = 0;
            state.currentPage = 1;
            state.loadingStatus = true;
            state.filred = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLoadProductsAction.pending, (state) => {
                state.loadingStatus = true
            }) 
            .addCase(fetchLoadProductsAction.fulfilled, (state, action) => {
                if (action.payload) {
                    state.ferstLoad = false;
                    state.ids = [...state.ids, ...action.payload.ids];
                    state.products = [...state.products, ...action.payload.products]
                    state.pages = Math.ceil(state.ids.length / state.productsInPage)
                    state.duplucates += action.payload.duplicate;
                    state.loadingStatus = false
                }
            })
            .addCase(fetchLoadFiltredIdsAction.pending, (state) => {
                    state.filred = true;
                    state.ids = []
                    state.loadingStatus = true
                    state.pages = 0;
                    state.currentPage = 1;
            })
            .addCase(fetchLoadFiltredIdsAction.fulfilled, (state, action) => {
                if(action.payload) {
                    state.ids = action.payload
                }
            })
            .addCase(fetchLoadFiltredProductsAction.fulfilled, (state, action) => {
                if(action.payload) {
                    state.products = action.payload
                    state.pages = Math.ceil(state.products.length / state.productsInPage)
                    state.loadingStatus = false
                }
            })
    }
})



export const productSlice = productProcess.reducer;

export const { setCurrentPage, setPages, incrementPage, decrementPage, setFirstLoad} = productProcess.actions;
