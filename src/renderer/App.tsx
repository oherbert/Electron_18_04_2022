import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuHidden } from './components/hidden-menu';
import MainSection from './style';
import DbConfigPg from './views/config/dbConfig';
import Header from './views/header';
import menu from './menu';
import ApiPgConfig from './views/config/apiConfig';

export default function App() {
  const location = useLocation();
  const [title, setTitle] = useState('');

  const render = () => {
    let pg;
    switch (location.hash) {
      case '#dataBase':
        if (title !== 'Banco de Dados') setTitle('Banco de Dados');
        pg = <DbConfigPg />;
        break;
      case '#api':
        if (title !== 'API') setTitle('API');
        pg = <ApiPgConfig />;
        break;
      default:
        if (title !== 'Principal') setTitle('Principal');
        pg = <ApiPgConfig />;
        break;
    }

    return pg;
  };

  return (
    <MainSection>
      <Header title={title} />
      <div className="div-main-body">
        <MenuHidden items={menu} />
        <div className="div-main-context">{render()}</div>
      </div>
    </MainSection>
  );
}
