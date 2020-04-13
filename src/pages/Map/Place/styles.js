import styled, { keyframes } from 'styled-components';

const showSidebar = keyframes`
  from {
    width: 0%;
  }

  to {
    width: 15%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  left: 0;

  transition: 200ms ease;

  animation: ${showSidebar} forwards 400ms;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  height: 100%;
  background: #5d95ef;
`;

export const DivExit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
  border-radius: 50%;
  padding: 2px;

  top: 1%;
  right: 3%;

  svg {
    cursor: pointer;
  }
`;

export const Icon = styled.div`
  width: 100px;
  height: 100px;

  background: white;
  border-radius: 50%;

  -webkit-box-shadow: 5px 5px 16px -8px rgba(84, 81, 84, 1);
  -moz-box-shadow: 5px 5px 16px -8px rgba(84, 81, 84, 1);
  box-shadow: 5px 5px 16px -8px rgba(84, 81, 84, 1);

  padding: 20px;
  margin-top: 15%;

  img {
    width: 100%;
    height: 100%;

    background-size: cover;
  }
`;

export const Title = styled.span`
  margin-top: 20px;

  font-size: 26px;
  color: white;
  font-weight: 700;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 70%;

  background: white;

  padding: 20px 15px;
  margin-top: 60px;
  border-radius: 12px;

  -webkit-box-shadow: 5px 5px 16px -8px rgba(33, 32, 33, 1);
  -moz-box-shadow: 5px 5px 16px -8px rgba(33, 32, 33, 1);
  box-shadow: 5px 5px 16px -8px rgba(33, 32, 33, 1);

  div.status {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: ${(props) => (props.status_place ? '#47af64' : '#e85247')};
      font-weight: 700;
    }
  }

  div.address {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      font-weight: 700;
      color: #e34934;
    }
    text-align: left;
    margin-top: 20px;
  }
`;
