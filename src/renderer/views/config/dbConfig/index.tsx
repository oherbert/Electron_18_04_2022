/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from 'renderer/context/AppContext';
import Swal from 'sweetalert2';
import Config from './styles';
import dbImgRed from '../../../../../assets/dbRed.png';
import dbImgGreen from '../../../../../assets/dbGreen.png';
import dbImgYellon from '../../../../../assets/dbYellon.png';

const noJsConfig = 'Não encontrado database.json';

const initialDBConfig = {
  user: noJsConfig,
  password: noJsConfig,
  connectString: noJsConfig,
  appInstantClient: false,
};

const DbConfigPg: React.FC = () => {
  const isMounted = useRef(true);
  const { execSql, getDBConfig, saveDBConfig } = useContext(Context);
  const [ping, setPing] = useState('offline');
  const [config, setConfig] = useState(initialDBConfig);
  const [dbIdTest, setDbIdTest] = useState(0);

  useEffect(() => {
    if (isMounted) {
      setPing('Testando conexão...');
      execSql<string>('ping')
        .then((res) => setPing(res))
        .catch((err) => console.log(err));
    }
    if (isMounted) {
      getDBConfig().then((res) => setConfig({ ...config, ...res }));
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleDb = () => {
    return ping === 'online'
      ? 'Online'
      : ping === 'changed'
      ? 'Alterado'
      : 'Offline';
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = ['user', 'connectString'].includes(event.target.id)
      ? event.target.value.replaceAll(' ', '')
      : event.target.value;
    setConfig({ ...config, [event.target.id]: newValue });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { user, password, connectString } = config;
    const configOk =
      !user ||
      user === noJsConfig ||
      !password ||
      ping === noJsConfig ||
      !connectString ||
      connectString === noJsConfig;

    if (!configOk)
      saveDBConfig(config)
        .then((res) => {
          if (res === 'saved') {
            Swal.fire({
              icon: 'success',
              title: 'Configuração salva com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((e) =>
          Swal.fire({
            icon: 'error',
            title: `Erro ao salvar!\n${e}`,
            showConfirmButton: false,
            timer: 1500,
          })
        );
    console.log(config);
  }

  return (
    <Config>
      <h1 id="h1-db-title">Configuração Logon Oracle</h1>
      <section id="sec-config-geral">
        <div id="div-img-db">
          <img
            id="imagem-db"
            title={titleDb()}
            alt="imagem-db"
            src={
              ping === 'online'
                ? dbImgGreen
                : ping === 'changed'
                ? dbImgYellon
                : dbImgRed
            }
          />
          <p id="p-title-db">{titleDb()} </p>
        </div>

        <form id="form-db" onSubmit={handleSubmit}>
          <div id="div-inputs-texts">
            <p>UserName:</p>
            <input
              type="text"
              id="user"
              onChange={handleChange}
              value={config.user}
            />
            <p>Password:</p>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={config.password}
            />
            <p>Database:</p>
            <input
              type="text"
              id="connectString"
              onChange={handleChange}
              value={config.connectString}
            />
            <label htmlFor="input-checkbox-db" id="label-checkbox-bd">
              <input
                id="input-checkbox-db"
                type="checkbox"
                checked={config.appInstantClient}
                onChange={() => {
                  setConfig({
                    ...config,
                    appInstantClient: !config.appInstantClient,
                  });
                }}
              />
              InstantClient da Aplicação
            </label>
          </div>

          <button className="button-db" type="submit">
            Salvar
          </button>
          <button
            className="button-db"
            type="button"
            onClick={() => {
              setPing('Aguardando resposta do banco de dados...');
              execSql<[{ id: number }]>('randomId')
                .then((res) => {
                  // eslint-disable-next-line promise/always-return
                  if (res && res[0].id) {
                    setPing('online');

                    Swal.fire({
                      icon: 'success',
                      title: 'Banco de dados conectado!',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else setPing(`${res}`);
                })
                .catch((e) => {
                  setPing('offline');
                  Swal.fire({
                    icon: 'error',
                    title: `Banco de dados não  conectado!\n${e}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            }}
          >
            Testar
          </button>
        </form>
      </section>

      <section className="section-msg">
        <h2>{['online', 'offline'].includes(ping) ? '' : ping}</h2>
        <h2>{!dbIdTest ? '' : `Id: ${dbIdTest}`}</h2>
      </section>
    </Config>
  );
};

export default DbConfigPg;
