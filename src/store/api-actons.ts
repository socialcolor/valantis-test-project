import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkType, FetchIds } from '../types/api-actions';
import { Ids } from '../types/ids';
import { Filter, Product } from '../types/state';
import { APIRoute } from '../const';
import { removingDuplicate, removingDuplicateProduct } from '../utils';
import { idsFilterd } from '../types/filter';

export const fetchLoadProductsAction = createAsyncThunk<Ids | void, undefined, AsyncThunkType>('product/fetchLoadIds', async (_arg, { dispatch, getState, extra: api }) => {
    try {
        let dublicateCount = getState().productSlice.duplucates;
        const loadStep = getState().productSlice.loadStep;
        const idsLenght = getState().productSlice.ids.length;
        const countLoadIds = loadStep + idsLenght + dublicateCount;

        const ids = await api.post<FetchIds>('', {
            action: APIRoute.Ids,
            params: { offset: countLoadIds, limit: loadStep }
        })

        const removeDiplicate = removingDuplicate(ids.data.result);
        const products = await api.post<{ result: Product[] }>('', {
            action: APIRoute.Items,
            params: { ids: ids.data.result }
        })

        return {
            ids: removeDiplicate,
            products: removingDuplicateProduct(products.data.result),
            duplicate: loadStep - removeDiplicate.length
        }

    } catch {
        dispatch(fetchLoadProductsAction())
    }
})

export const fetchLoadFiltersAction = createAsyncThunk<Omit<Filter, 'activeFilter'> | void, undefined, AsyncThunkType>('filter/fetchLoadFilters', async (_arg, { dispatch, extra: api }) => {
    try {
        const product = await api.post<{ result: string[] }>('', {
            action: APIRoute.Fields,
            params: { field: 'product' }
        })
        const price = await api.post<{ result: number[] }>('', {
            action: APIRoute.Fields,
            params: { field: 'price' }
        })
        const brand = await api.post<{ result: string[] }>('', {
            action: APIRoute.Fields,
            params: { field: 'brand' }
        })

        return {
            product: removingDuplicate(product.data.result),
            price: removingDuplicate(price.data.result),
            brand: removingDuplicate(brand.data.result),
            loadingStatus: false,
        }
    } catch {
        dispatch(fetchLoadFiltersAction());
    }
})

export const fetchLoadFiltredIdsAction = createAsyncThunk<string[] | void, idsFilterd, AsyncThunkType>('filter/fetchLoadFiltredIds', async ({filter, value}, { dispatch, extra: api }) => {
        try {
            const typeValue = filter === 'price' ? Number(value) : value;
            const ids = await api.post<FetchIds>('', {
                action: APIRoute.Filter,
                params: {[filter]: typeValue}
            })
            const removeDiplicateIds = removingDuplicate(ids.data.result);

            dispatch(fetchLoadFiltredProductsAction({ids: removeDiplicateIds}))
            return removeDiplicateIds
        } catch {
            dispatch(fetchLoadFiltredIdsAction({filter, value}));
        }
})

export const fetchLoadFiltredProductsAction = createAsyncThunk<Product[] | void, {ids: string[]}, AsyncThunkType>('filter/fetchLoadFiltredProducts', async ({ids}, { dispatch, extra: api }) => {
    try {
        const products = await api.post<{ result: Product[] }>('', {
            action: APIRoute.Items,
            params: { ids: ids }
        })
        const removeDiplicateProducts = removingDuplicateProduct(products.data.result)
    
        return removeDiplicateProducts
    } catch {
        dispatch(fetchLoadFiltredProductsAction({ids}))
    }
})
