// import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuHidden } from './components/hidden-menu';
import MainSection from './style';
import ConfigPage from './views/config';
import Header from './views/header';
import menu from './menu';

export default function App() {
  const location = useLocation();

  const render = () => {
    let pg;
    switch (location.hash) {
      case '#dataBase':
        pg = <ConfigPage />;
        break;
      default:
        pg = (
          <div>
            <p>{location.hash}</p>
          </div>
        );
        break;
    }

    return pg;
  };

  useEffect(() => console.log(location.hash), [location]);

  return (
    <MainSection>
      <Header title="Main" />
      <div className="div-main-body">
        <MenuHidden items={menu} />
        <div className="div-main-context">{render()}</div>
      </div>
    </MainSection>
  );
}
