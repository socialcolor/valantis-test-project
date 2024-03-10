import * as S from './products-style';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchLoadProductsAction } from "../../store/api-actons";
import { getCurrentPage, getFiltredStatus, getPages, getProducts } from "../../store/product-process/selectors"
import { Product as ProductType } from '../../types/state';
import Product from '../product/product';

export default function Products() {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(getCurrentPage());
    const pages = useAppSelector(getPages())
    const filtred = useAppSelector(getFiltredStatus())
    const products = useAppSelector((state) => getProducts(state, currentPage));

    useEffect(() => {
        if (!filtred && pages !== 1 && pages < (currentPage + 2)) dispatch(fetchLoadProductsAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages, currentPage])

    return (
        <S.Products>
            {products.map((elem:ProductType) => <Product key={elem.id} {...elem}/>)}
        </S.Products>
    )
}
