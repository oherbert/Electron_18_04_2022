import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface ISphere {
  colorH: number;
}

export const Header = styled.section`
  ${({
    theme: {
      menu: { color, background },
    },
  }) => css`
    background: ${background};
    background: linear-gradient(
      90deg,
      ${lighten(0.1, background)} 30%,
      ${lighten(0.2, background)} 80%,
      ${lighten(0.3, background)} 100%
    );
    display: inline;
    color: ${color};
    border: 1px solid black;
    margin-top: 5px;
    width: 100%;
    height: fit-content;
    padding-bottom: 5px;
    display: flex; /* establish flex container */
    // flex-direction: row; /* default value; can be omitted */
    font-size: 24px;
    font-weight: bold;
    justify-content: space-around;

    .sphere-conteiner {
      width: fit-content;
    }

    .title {
      margin: auto 100px;
      height: 100%;
      font-size: 48px;
    }
  `}
`;

export const Sphere = styled.div<ISphere>`
  ${({ colorH }) => css`
    width: 40px;
    height: 40px;
    margin: auto;
    border-radius: 50%;
    border: 1px solid hsl(${colorH}, 100%, 40%);
    position: relative;
    background: radial-gradient(
      circle at 50% 120%,
      hsl(${colorH}, 100%, 40%),
      hsl(${colorH}, 100%, 60%) 10%,
      hsl(${colorH}, 100%, 70%) 80%,
      hsl(${colorH}, 100%, 80%) 100%
    );
    cursor: pointer;

    :before {
      content: '';
      position: relative;
      top: 1%;
      left: 5%;
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 0px,
        #ffffff,
        rgba(255, 255, 255, 0) 58%
      );
      filter: blur(5px);
      z-index: 2;
    }
  `}
`;
