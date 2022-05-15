import { useContext, useState } from 'react';
import { MenuHidden } from './components/hidden-menu';
import { Context } from './context/AppContext';
import MainSection from './style';
import ConfigPage from './views/config';
import Header from './views/header';
import menu from './menu';

export default function App() {
  const { theme } = useContext(Context);
  const [page, setPage] = useState(true);

  const render = () => {
    return page ? (
      <div>
        <p>main</p>
      </div>
    ) : (
      <ConfigPage />
    );
  };

  return (
    <MainSection style={theme}>
      <Header title="Main" />
      <div className="div-main-body">
        <MenuHidden
          items={menu}
          color={theme.color}
          background={theme.background}
        />
        <div className="div-main-context">
          <input
            type="checkbox"
            onChange={() => setPage(!page)}
            checked={page}
          />
          {render()}
        </div>
      </div>
    </MainSection>
  );
}
