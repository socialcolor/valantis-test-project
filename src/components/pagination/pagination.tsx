import * as S from './pagination-style';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { getCurrentPage, getPages } from '../../store/product-process/selectors';
import { decrementPage, incrementPage, setCurrentPage } from '../../store/product-process/product-process';
import { numberToArray, paginationSlicer } from '../../utils';

export default function Pagination() {
    const dispatch = useDispatch();

    const pages = useAppSelector(getPages());
    const currenPage = useAppSelector(getCurrentPage());
    const arrayPages = numberToArray(pages);
    
    const pagination = paginationSlicer(arrayPages, currenPage);

    const onNumberClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        dispatch(setCurrentPage((Number(evt.currentTarget.value))));
    };

    const onPrevClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        dispatch(decrementPage());
    }
    const onNextClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        dispatch(incrementPage());
    }

    return (
        <S.wrapper>
            {currenPage !== 1 && <S.prev onClick={onPrevClick}>&lt;&lt;</S.prev>}

            {pages && pages > 5 && currenPage >= 5 && <S.number value={1} onClick={onNumberClick}>1....</S.number>}

            {pagination.map((page) => {
                return <S.number key={page} $active={(currenPage === page)} value={page} onClick={onNumberClick}>{page}</S.number>
            })}

            {pages && pages > 5 && currenPage < (pages - 3) && <S.number value={pages} onClick={onNumberClick}>....{pages}</S.number>}

            {pages && pages > 1 && <S.next onClick={onNextClick}>&gt;&gt;</S.next>}
        </S.wrapper>
    )
}
