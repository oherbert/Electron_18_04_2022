/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './styles';

interface IHiddenMenu {
  items: Array<IItemLink | IItemContener>;
}

export interface IItemLink {
  label: string;
  link: string;
}

export interface IItemContener {
  label: string;
  children: IItemLink[];
}

const reducer = (state: string[], payload: string) => {
  const newState = [...state];

  if (newState.includes(payload)) newState.splice(newState.indexOf(payload), 1);
  else newState.push(payload);

  if (payload === 'clean') newState.splice(0, newState.length);

  return [...newState];
};

export const MenuHidden: React.FC<IHiddenMenu> = ({ items }: IHiddenMenu) => {
  const [state, dispatch] = useReducer(reducer, [] as string[]);

  const createMenu = (
    item: IItemContener | IItemLink,
    nivel = 1
  ): React.ReactChild => {
    return 'link' in item ? (
      <Link
        className="link"
        to={item.link}
        key={`mnLink${Math.random()}`}
        onClick={() => console.log(window.location.href)}
      >
        <Styled.Item className={`nivel-${nivel}`}>
          <span className="span-arrow">
            <div className="arrow-inv" />
          </span>
          <span className="span-caption">{item.label}</span>
        </Styled.Item>
      </Link>
    ) : (
      <>
        <Styled.Item
          className={`nivel-${nivel}`}
          onClick={() => dispatch(item.label)}
        >
          <span className="span-arrow">
            {state.includes(item.label) ? (
              <div className="arrow-dwn" />
            ) : (
              <div className="arrow-rgt" />
            )}
          </span>
          <span className="span-caption">{item.label}</span>
        </Styled.Item>
        {/* cria os filhos ao ser clicado */}
        {state.includes(item.label) ? (
          <>{item.children.map((child) => createMenu(child, nivel + 1))}</>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Styled.MenuHidden onMouseLeave={() => dispatch('clean')}>
      <Styled.Menu className="menu">
        {items.map((item, idx) => (
          <Styled.MenuDrop key={`mnDrop${idx}`}>
            {createMenu(item)}
          </Styled.MenuDrop>
        ))}
      </Styled.Menu>
    </Styled.MenuHidden>
  );
};
