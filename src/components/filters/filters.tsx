import * as S from './filter-style';
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchLoadFiltredIdsAction } from "../../store/api-actons";
import { resetActiveFilter, setActiveFilter } from "../../store/filter-process/filter-process";
import { getActiveFilter, getFilters } from "../../store/filter-process/selectors"
import { setFirstLoad } from "../../store/product-process/product-process";

export function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getFilters())
    const activeFilter = useAppSelector(getActiveFilter());

    const onChangeFilter = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        evt.preventDefault();
        if(evt.currentTarget.value === 'default') {
            dispatch(setFirstLoad())
            dispatch(resetActiveFilter())
            return 
        }
        dispatch(setActiveFilter({name: evt.target.id, value: evt.currentTarget.value}))
        dispatch(fetchLoadFiltredIdsAction({ filter: evt.target.id, value: evt.currentTarget.value }))
    }
    return (
        <S.Filter>
            <S.Select id='price' onChange={onChangeFilter} value={activeFilter.name === 'price' ? activeFilter.value : 'default'}>
                <S.Option value='default'>Выберите цену</S.Option>
                {filters.price.map((element) => <S.Option value={element} key={element}>{element}</S.Option>)}
            </S.Select>
            <S.Select id='brand' onChange={onChangeFilter} value={activeFilter.name === 'brand' ? activeFilter.value : 'default'}>
                <S.Option value='default'>Выберите Бренд</S.Option>
                {filters.brand.map((element) => <S.Option value={element} key={element ? element : 'Без бренда'}>{element ? element : 'Без бренда'}</S.Option>)}
            </S.Select>
            <S.Select id='product' onChange={onChangeFilter} value={activeFilter.name === 'product' ? activeFilter.value : 'default'}>
                <S.Option value='default'>Выберите продукт</S.Option>
                {filters.product.map((element) => <S.Option value={element} key={element}>{element}</S.Option>)}
            </S.Select>
        </S.Filter>
    )
}
