import styled, { css } from 'styled-components';

const Config = styled.div`
  ${() => css`
    height: 100vmax;
    width: 100vmax;
    user-select: none;
    display: flex;
    flex-direction: column;

    #h1-db {
      text-align: center;
      margin-top: 15px;
    }

    .div-db {
      font-size: 10px;
      color: black;
      background-color: #e0e0e0;
      display: flex;
      max-width: 330px;
      height: 145px;
      margin: 15px auto;
      border-radius: 7px;
      border: 2px solid #a1a1a1;
    }
    .label-db {
      display: inline-flex;
      margin-top: 2px;
      text-align: right;
      p {
        padding-right: 3px;
        width: 55px;
      }
    }
    .input-text-db {
      width: 140px;
      :hover {
        border-color: darkblue;
      }
    }
    #imagem-db {
      height: 80px;
      width: 80px;
      margin-top: 10px;
    }
    #p-title-db {
      text-align: center;
      font-size: 10px;
    }
    #fieldSet-db {
      padding: 10px 10px;
      height: 70px;
      width: 210px;
      margin: 5px 10px 0 0;
    }

    .button-db {
      background-color: #fff;
      border-radius: 3px;
      margin-top: 8px;
      height: 24px;
      width: 50px;
      text-align: center;

      :hover {
        background-color: #e0e0e0;
        cursor: pointer;
      }
      :disabled {
        opacity: 0.8;
        :hover {
          cursor: wait;
        }
      }
    }
    #input-test-db {
      margin-left: 5px;
    }
  `}
`;

export default Config;
