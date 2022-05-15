import { useContext } from 'react';
import { Context } from 'renderer/context/AppContext';
import * as Styled from './styles';

export interface IHeader {
  // eslint-disable-next-line react/require-default-props
  style?: React.CSSProperties;
  title: string;
}

const Header: React.FC<IHeader> = ({ style, title }: IHeader) => {
  const { dispatch, job } = useContext(Context);

  return (
    <Styled.Header style={style}>
      <span className="title">{title}</span>
      <span className="sphere-conteiner">
        <p>STATUS API</p>
        <Styled.Sphere
          colorH={job === 'Start' ? 120 : 0}
          onClick={() =>
            dispatch({
              type: 'job',
              payload: job === 'Start' ? 'Stop' : 'Start',
            })
          }
        />
      </span>
    </Styled.Header>
  );
};

export default Header;
