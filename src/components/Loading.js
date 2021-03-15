/*
  https://codepen.io/danhearn/pen/MvqgdM
*/

import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const boxRotate = keyframes`
 	0% {
    transform: scale(0.2);
 	}
 	100% {
    transform: scale(0.75);
  }
`;

const loaderAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;

const HollowLoader = styled.div`
  width: 3em;
  height: 3em;
  animation: ${loaderAnim} 0.5s infinite ease-in-out;
  outline: 1px solid transparent;

  .largeBox {
    height: 3em;
    width: 3em;
    background-color: #ececec;
    outline: 1px solid transparent;
    position: fixed;
  }

  .smallBox {
    height: 3em;
    width: 3em;
    background-color: #34495e;
    position: fixed;
    z-index: 1;
    outline: 1px solid transparent;
    animation: ${boxRotate} 0.5s alternate infinite ease-in-out;
  }
`;
const Container = styled.div`
  background-color: rgb(226, 230, 227);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100vh;
  margin: 0;
`;

const Loading = () => {
  return (
    <Container>
      <HollowLoader>
        <div className="largeBox"></div>
        <div className="smallBox"></div>
      </HollowLoader>
    </Container>
  );
};

export default Loading;
