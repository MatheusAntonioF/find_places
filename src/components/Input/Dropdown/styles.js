import styled from 'styled-components';

export const Container = styled.div`
  width: ${(props) => props.width};

  background: none;

  label {
    font-size: 14px;
    color: #999999;
    transition: 250ms ease;
  }

  div.custom__container {
    margin-top: 10px;
  }

  div.custom__value-container {
    font-size: 15px;
  }

  div.custom__control {
    box-shadow: 2px 2px 5px 0px rgba(102, 98, 102, 1);

    border: 1px solid ${(props) => props.theme.grafit.default};

    height: ${(props) => props.height};
    width: 100%;
  }

  div.custom__control--is-focused {
    border: 0.1px solid ${(props) => props.theme.info.default};
  }

  div.custom__menu {
    padding: 10px;
  }

  div.custom__option {
    margin-bottom: 5px;
    height: 48px;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.grafit.hover};

    &:last-child {
      margin-bottom: 0;
    }
  }

  div.custom__option:hover {
    background: ${(props) => props.theme.info.disabled};
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }

  div.custom__option--is-focused {
    background: ${(props) => props.theme.info.disabled};
    font-weight: bold;
    color: #fff;
  }

  div.custom__option--is-selected {
    background: ${(props) => props.theme.info.default};
    font-weight: bold;
    color: #fff;
  }
`;
