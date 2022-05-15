/* eslint-disable no-nested-ternary */
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Context } from 'renderer/context/AppContext';
import { IAction } from 'renderer/types/renderTypes';
import IDbConfig from 'renderer/types/IDbConfig';
import Config from './styles';
import dbImgRed from '../../../../assets/dbRed.png';
import dbImgGreen from '../../../../assets/dbGreen.png';
import dbImgYellon from '../../../../assets/dbYellon.png';

const noJsConfig = 'Não encontrado database.json';

const initialDBConfig = {
  user: noJsConfig,
  password: noJsConfig,
  connectString: noJsConfig,
};

const setDbConfig = (state: IDbConfig, { type, payload }: IAction) => {
  if (type === 'object' && payload instanceof Object) {
    return { ...state, ...payload };
  }
  const newValue = Object.keys(state).includes(type) ? { [type]: payload } : {};
  return { ...state, ...newValue };
};
const ConfigPage: React.FC = () => {
  const isMounted = useRef(true);
  const [dataTest, setDataTest] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [configDB, dispatch] = useReducer(setDbConfig, initialDBConfig);
  const context = useContext(Context);
  const { getDBConfig, saveDBConfig } = context;

  const checkData = async () => {
    const dados = await context.execSql<[{ id: number }]>('randomId');

    console.log(dados);

    if (isMounted.current) {
      if (dados[0] && Object.keys(dados[0]).includes('id'))
        setDataTest(dados[0].id);
      else {
        console.log(dados);
        setDataTest(-2);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const jsonConfig = await getDBConfig();

      console.log(jsonConfig);

      if (isMounted.current) {
        dispatch({ type: 'object', payload: jsonConfig });
      }
      await checkData();
      setIsLoading(false);
    })();
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Config>
      <h1 id="h1-db">Configuração Logon Oracle</h1>
      <div className="div-db">
        <div>
          <img
            id="imagem-db"
            title={
              dataTest > 0
                ? 'Banco Online'
                : dataTest === -1
                ? 'Banco Alterado'
                : 'Banco Offline'
            }
            alt="imagem-db"
            src={
              dataTest > 0
                ? dbImgGreen
                : dataTest === -1
                ? dbImgYellon
                : dbImgRed
            }
          />
          <p id="p-title-db">
            {dataTest > 0
              ? 'Banco Online'
              : dataTest === -1
              ? 'Banco Alterado'
              : 'Banco Offline'}
          </p>
        </div>
        <div id="form-db">
          <fieldset id="fieldSet-db">
            <label htmlFor="userName" className="label-db">
              <p>UserName</p>
              <input
                className="input-text-db"
                type="text"
                id="userName"
                name="userName"
                value={configDB.user}
                onChange={(event) =>
                  dispatch({ type: 'user', payload: event.target.value })
                }
              />
            </label>
            <label htmlFor="password" className="label-db">
              <p>Password</p>
              <input
                className="input-text-db"
                type="password"
                id="password"
                name="password"
                value={configDB.password}
                onChange={(event) =>
                  dispatch({ type: 'password', payload: event.target.value })
                }
              />
            </label>
            <label htmlFor="database" className="label-db">
              <p>Database</p>
              <input
                className="input-text-db"
                type="text"
                id="database"
                name="database"
                value={configDB.connectString}
                onChange={(event) =>
                  dispatch({
                    type: 'connectString',
                    payload: event.target.value,
                  })
                }
              />
            </label>
          </fieldset>
          <input
            className="button-db"
            type="button"
            value="Save"
            disabled={isLoading}
            onClick={async () => {
              const r1 = await saveDBConfig('user', configDB.user);
              const r2 = await saveDBConfig('password', configDB.password);
              const r3 = await saveDBConfig(
                'connectString',
                configDB.connectString
              );

              const change = [r1, r2, r3].filter(
                (e) => !e.includes('Not Change')
              );

              if (change.length > 0) setDataTest(-1);
            }}
          />
          <input
            className="button-db"
            id="input-test-db"
            type="button"
            value="Teste"
            onClick={() => window.document.location.reload()}
            // onClick={() => checkData()}
            disabled={isLoading}
          />
        </div>
      </div>
      <p>{isLoading && '...procurando conexão com os Dados atuais!'}</p>
    </Config>
  );
};

export default ConfigPage;
