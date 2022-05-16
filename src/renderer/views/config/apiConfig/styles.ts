import styled, { css } from 'styled-components';

const ApiConfig = styled.div`
  ${({ theme: { color } }) => css`
    color: ${color};

    #h1-api-title {
      text-align: center;
      margin-top: 2rem;
    }
    #form-api {
      display: inline-block;
      margin: 15px;
      font-size: 1.1rem;
      border: 2px solid ${color};
      border-radius: 7px;
      width: 500px;
      height: 485px;

      p {
        font-size: 1.1rem;
        margin-top: 4px;
        display: inline-block;
        text-align: right;
        font-size: 1.1rem;
        font-weight: bold;
        padding: 5px;
        width: 7rem;
      }
      label {
        display: block;
        margin: 20px;
      }
      select {
        font-size: 1rem;
        font-weight: bold;
        margin-left: 5px;
      }
      textarea {
        border-radius: 4px;
        display: block;
        margin-top: 5px;
        width: 460px;
        height: 225px;
        font-size: 1rem;
        resize: none;
      }
      input {
        font-size: 1.1rem;
        margin-left: 5px;
        :hover {
          border-color: lightgray;
        }
      }
      button {
        margin: 8px 10px 0 20px;
        background-color: white;
        padding: 7px 14px;
        border-radius: 10px;
        border: none;
        appearance: none;
        font-size: 1.3rem;
        box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
          0px 18px 88px -4px rgba(24, 39, 75, 0.14);
        transition: all ease-in 0.1s;
        cursor: pointer;
        opacity: 0.9;
        :hover {
          transform: scale(1.05);
          opacity: 1;
        }
        :disabled {
          opacity: 0.8;
          :hover {
            cursor: wait;
          }
        }
      }
    }
  `}
`;

export default ApiConfig;
