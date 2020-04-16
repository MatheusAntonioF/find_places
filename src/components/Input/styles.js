import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 8px;
  width: ${(props) => props.width};
  label {
    font-size: 14px;
    color: #999999;
    transition: 250ms ease;

    &.focus {
      color: ${(props) => props.theme.info.default};
    }

    &.success {
      border: 1px solid #00ffbf !important;
    }

    &.error {
      border: 1px solid #ff3300 !important;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => props.height}px;
  align-items: center;
  background: #fff;
  border: 1px solid ${(props) => props.theme.grafit.default};
  border-radius: 3px;
  padding-right: 5px;
  transition: 250ms ease;
  margin-top: 2px;

  input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    border: 0;
    font-size: 15px;
  }

  input::-webkit-inner-spin-button {
    display: none;
  }
  input[type='date']::-webkit-input-placeholder {
    visibility: hidden !important;
  }

  &.focus {
    border: 1px solid ${(props) => props.theme.info.default};
  }

  &.success {
    border: 1px solid #00ffbf !important;

    svg {
      color: #00ffbf;
      fill: #00ffbf;
    }
  }

  &.error {
    border: 1px solid #ff3300 !important;

    svg {
      color: #ff3300;
      fill: #ff3300;
    }
  }
`;
