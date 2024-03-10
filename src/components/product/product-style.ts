import styled from 'styled-components'

export const Wrapper = styled.li`
    width: auto;
    min-height: 363px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    font-family: ${({theme}) => theme.fonts.montserrat};
    font-weight: 400;
    border-radius: 15px;
    background-color: ${({theme}) => theme.colors.white};
    color: ${({theme}) => theme.colors.dark};
    
`
export const Id = styled.p`
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
`

export const Brand = styled(Id)`
`

export const Name = styled(Id)`
    font-size: 16px;
    padding: 10px 5px 5px 10px;
    width: 100%;
    text-align: center;
`

export const Price = styled(Id)`
    color: ${({theme}) => theme.colors.red};
    font-size: 16px;
`


