import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const spinner = keyframes`
    to {
         transform: rotate(1turn);
     }
`

export const Spinner = styled.div` 
   width: 56px;
   height: 56px;
   border-radius: 50%;
   background: conic-gradient(#0000 10%, #e60d25);
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
   animation: ${spinner} 1s infinite linear;
`
