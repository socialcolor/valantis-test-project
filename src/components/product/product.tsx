import * as S from './product-style';
import { Product as ProductType} from '../../types/state';

export default function Product(property: ProductType) {
    return (
        <S.Wrapper>
           <S.Name>{property.product}</S.Name> 
           <S.Brand>{property.brand ? property.brand : 'Без бренда'}</S.Brand>
           <S.Id>{property.id}</S.Id>
           <S.Price>{new Intl.NumberFormat('ru-RU').format(property.price)}₽</S.Price>
        </S.Wrapper>
    )
}
