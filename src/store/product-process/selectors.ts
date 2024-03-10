import { createSelector } from '@reduxjs/toolkit';
import { Product, State } from '../../types/state';

export const getFerstLoadStatus = () => (state: State) => state.productSlice.ferstLoad;
export const getCurrentPage = () => (state: State) => state.productSlice.currentPage;
export const getPages = () => (state: State) => state.productSlice.pages;
export const getLoadingStatus = () => (state: State) => state.productSlice.loadingStatus;
export const getFiltredStatus = () => (state: State) => state.productSlice.filred;

export const selectProducts = (state: State) => state.productSlice.products;
export const getProducts = createSelector(
    selectProducts,
    (state:State, currentPage: number) => currentPage,
    (products:Product[], currentPage:number) => {
      const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * 50;
      const endIndex = currentPage * 50;
      return products.slice(startIndex, endIndex);
    }
  );
  