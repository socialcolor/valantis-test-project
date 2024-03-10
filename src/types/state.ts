import { store } from "../store"

export type Product = {
    brand: string | null,
    id: string,
    price: number,
    product: string
}

export type Products = {
    ferstLoad: boolean,
    ids: string[],
    products: Product[],
    duplucates: number,
    loadStep: number,
    productsInPage: number,
    pages: number,
    currentPage: number,
    loadingStatus: boolean,
    filred: boolean,
}

export type Filter = {
    product: string[],
    price: number[],
    brand: string[],
    loadingStatus: boolean,
    activeFilter: {
        name: string,
        value: string | number,
    },
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
