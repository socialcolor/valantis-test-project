import md5 from 'md5'
import { Product } from './types/state';

export const getAuthToken = () => md5(`${process.env.REACT_APP_PASSWORD}_${getDate()}` );

export const removingDuplicate = <T>(data:T[]):T[] => [...new Set(data)];

const getDate = () => {
    const now = new Date();
    const yers = now.getUTCFullYear().toString();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = now.getUTCDate().toString().padStart(2, '0');

    return yers + month + day
}

export const removingDuplicateProduct = (products:Product[]):Product[] => {
    const map = new Map();
    products.forEach(product => {
        if(!map.has(product.id)) {
            map.set(product.id, product)
        }
    })

    return Array.from(map.values())
}

export const paginationSlicer = (pages: number[], currentPage: number):number[] => {
    if(pages.length > 5) {
        const start = currentPage >= 5 ? currentPage - 3 : 0;
        const end = currentPage >= 5 ? currentPage + 2 : 5;
        const result = pages.slice(start, end);
        return result;
    }

    return pages;
}

export const numberToArray = (number:number):number[] => {
    const array = [];
    
    for (let i = 1; i <= number; i++) {
        array.push(i)
    }

    return array;
}
