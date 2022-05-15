import styled, { css } from 'styled-components';

const Config = styled.div`
  ${() => css`
    // height: 100vmax;
    // width: 100vmax;
    user-select: none;
    display: flex;
    flex-direction: column;

    #h1-db-title {
      text-align: center;
      margin-top: 15px;
    }

    #sec-config-geral {
      color: black;
      background-color: #e0e0e0;
      display: flex;
      width: 360px;
      height: 188px;
      margin: 20px auto;
      border-radius: 7px;
      border: 2px solid #a1a1a1;
    }
    #imagem-db {
      height: 80px;
      width: 80px;
      margin: 12px 0 0 5px;
    }
    #p-title-db {
      text-align: center;
      font-size: 15px;
      font-weight: bold;
    }

    #form-db {
      display: inline-block;
      margin: 15px;

      p {
        margin-top: 4px;
        display: inline-block;
        text-align: right;
        font-size: 12px;
        font-weight: bold;
        padding: 5px;
        width: 60px;
      }
      input {
        :hover {
          border-color: lightgray;
        }
      }
    }

    #div-inputs-texts {
      border: 2px solid #a1a1a1;
      width: 100%;
    }

    #label-checkbox-bd {
      font-size: 0.8rem;
    }
    #input-checkbox-db {
      margin: 8px 9px 12px;
    }

    .button-db {
      margin: 8px 10px 0 0;
      background-color: white;
      padding: 7px 14px;
      border-radius: 10px;
      border: none;
      appearance: none;
      font-size: 1rem;
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
  `}
`;

export default Config;
