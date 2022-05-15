import styled, { css } from 'styled-components';
import { lighten } from 'polished';

// Deve ser maior que 80 e 250
export const MenuHidden = styled.div`
  ${({
    theme: {
      menu: { primary, second, color, background },
    },
  }) => css`
    color: ${color};
    width: 10rem;
    overflow: hidden;
    background-color: ${background};
    background: linear-gradient(
      180deg,
      ${lighten(0.1, background)} 30%,
      ${lighten(0.2, background)} 80%,
      ${lighten(0.3, background)} 100%
    );
    font-size: 1rem;
    font-weight: bold;
    transition: width 0.1s;
    transition-timing-function: cubic-bezier(0, 0, 1, 1);

    .span-arrow {
      padding: 0px 8px;
      border-right: 2px solid ${color};
      height: 100%;
    }
    .span-caption {
      margin-left: 10px;
    }
    .arrow-dwn,
    .arrow-rgt,
    .arrow-inv {
      display: inline-block;
      background-color: transparent;
      border-bottom: 2px solid ${color};
      border-right: 2px solid ${color};

      height: 8px;
      width: 8px;
      margin-right: 3px;
    }
    .arrow-dwn {
      transform: rotate(45deg);
    }
    .arrow-rgt {
      transform: rotate(-45deg);
    }
    .arrow-inv {
      border-bottom: 3px solid transparent;
      border-right: 3px solid transparent;
    }

    .nivel-1 {
      background-color: ${primary};
      background-position: center 15px;
      border-bottom: 2px solid black;
      border-top: 2px solid black;
      margin-top: -1px;
    }

    .nivel-2 {
      background-color: ${second};
      background-position: center 15px;
      border-bottom: 2px solid black;
    }
    .nivel-1:hover,
    .nivel-2:hover {
      transform: scale(1.01);
    }
    .link {
      color: ${color};
      text-decoration: none;
    }
  `}
`;

export const Menu = styled.ul`
  ${() => css`
    width: 100%;
  `}
`;

export const MenuDrop = styled.ul`
  ${() => css`
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  `}
`;

export const Item = styled.li`
  ${() => css`
    height: 100%;
    width: 100%;
    margin: auto;
    padding: 7px 0; // aumentar o tamanho do bloco
  `}
`;
