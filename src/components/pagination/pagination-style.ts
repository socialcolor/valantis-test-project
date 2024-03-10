import styled from 'styled-components';

const defaultButton = styled.button`
    cursor: pointer;
    width: 43px;
    height: 43px;
    border: none;
    font-family: ${({theme}) => theme.fonts.montserrat};
    font-size: 18px;
    color: ${({theme}) => theme.colors.dark};
    border-radius: 50%;
    background: none;
    transition: all 300ms ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.red};
        color: ${({theme}) => theme.colors.dark};
    }
    &:active {
        background-color: ${({theme}) => theme.colors.white};
        color: ${({theme}) => theme.colors.red};

    }
` 

export const wrapper = styled.div`
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
`
export const number = styled(defaultButton)<{$active?: boolean}>`
    ${({$active, theme}) => $active ? `background-color: ${theme.colors.darkGray}; color: ${theme.colors.red}; font-weight: bold;` : null}
`

export const prev = styled(defaultButton)`


`

export const next = styled(defaultButton)`

`
