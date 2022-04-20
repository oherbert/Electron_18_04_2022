import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const Hello = () => {
  const { on, saveDBConfig } = window.electron.ipcRenderer;

  const [data, setData] = useState('');
  const [user, setUser] = useState('');

  on('teste', (resp: Record<string, number>[] | string[]) => {
    if (
      Array.isArray(resp) &&
      resp.length > 0 &&
      typeof resp[0] === 'object' &&
      'teste' in resp[0]
    )
      setData(resp[0].teste.toString());
    else if (Array.isArray(resp) && resp.length > 0 && resp[0].toString())
      setData(resp[0].toString());
  });

  on('saveDBConfig', (res: string) => {
    console.log(res);
  });

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <h2>{data && `Resposta: ${data}`}</h2>
      <input type="text" onChange={(e: any) => setUser(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          if (user.length > 0) saveDBConfig('user', user);
          window.electron.ipcRenderer.execSql('teste', [
            Math.round(Math.random() * 10).toString(10),
          ]);
        }}
      >
        Teste
      </button>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
