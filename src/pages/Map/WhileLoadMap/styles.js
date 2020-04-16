import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.info.default};

  ${(props) =>
    props.isLoad &&
    css`
      svg {
        animation: ${spin} 1s infinite;
        color: ${props.theme.info.default};
      }
    `}
`;
