import { useEffect } from "react";
import * as S from './app-styles';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFerstLoadStatus, getLoadingStatus } from "../../store/product-process/selectors";
import { getFiltersLoadingStatus } from "../../store/filter-process/selectors";
import { fetchLoadFiltersAction, fetchLoadProductsAction } from "../../store/api-actons";
import Products from "../products/products";
import Preloader from "../preloader/preloader";
import Pagination from "../pagination/pagination";
import { Filters } from "../filters/filters";

export default function App() {
    const dispatch = useAppDispatch();
    
    const ferstLoadStatus = useAppSelector(getFerstLoadStatus())
    const loadingStatusProducts = useAppSelector(getLoadingStatus());
    const loadingStatusFilters = useAppSelector(getFiltersLoadingStatus());

    useEffect(()=>{
        if(ferstLoadStatus) {
            dispatch(fetchLoadProductsAction());
            dispatch(fetchLoadFiltersAction());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ferstLoadStatus])

    if (loadingStatusProducts || loadingStatusFilters) return <Preloader />

    return (
        <S.main>
            <Filters />
            <Products />
            <Pagination />
        </S.main>
    )
}
