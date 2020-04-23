import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const PlaceInfo = styled.div`
  padding: 2px;
  color: #4081ec;
`;

export const WrapperDropdown = styled.div`
  position: fixed;
  z-index: 1;
  width: 50px;
  top: 0.1%;
  left: 10%;

  background: none;
  transition: 200ms ease;

  ${(props) =>
    props.showInfoWindow &&
    css`
      display: none;
    `}

  @media (max-width: 400px) {
    top: 6%;
    left: 2.3%;
  }
`;

export const Loading = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isLoad &&
    css`
      svg {
        animation: ${spin} 1s infinite;
        color: ${props.theme.info.default};
      }
    `}
`;
