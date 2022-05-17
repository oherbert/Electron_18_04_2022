/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from 'renderer/context/AppContext';
import IApiConfig from 'renderer/types/IApiConfig';
import Swal from 'sweetalert2';
import ApiConfig from './styles';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

const initalApiConfig: IApiConfig = {
  port: 19031,
  routes: {
    method: 'GET',
    url: '/teste',
    sql: `select 'sem Dados' from dual`,
  },
};

export default function ApiPgConfig() {
  const isMounted = useRef(true);
  const { getApiConfig, saveApiConfig } = useContext(Context);
  const [config, setConfig] = useState<IApiConfig>(initalApiConfig);

  useEffect(() => {
    if (isMounted) {
      getApiConfig().then((res) => setConfig(res));
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const {
      port,
      routes: { url, sql },
    } = config;
    const configOk =
      !port || port >= 0 || !url || url.indexOf('/') === 0 || !sql;

    if (configOk)
      saveApiConfig(config)
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
    <ApiConfig>
      <h1 id="h1-api-title">Configuração API</h1>
      <section id="sec-api-geral">
        <form id="form-api" onSubmit={handleSubmit}>
          <label htmlFor="input-text-port" id="label-port">
            Porta:
            <input
              id="input-port"
              type="text"
              value={config.port}
              onChange={(evt) => {
                setConfig({
                  ...config,
                  port: +evt.target.value || 0,
                });
              }}
            />
          </label>
          <label htmlFor="input-text-method" id="label-method">
            Método:
            <select
              id="select-method"
              name="method"
              value={config.routes.method}
              onChange={(evt) => {
                setConfig({
                  ...config,
                  routes: {
                    ...config.routes,
                    method: evt.target.value as Methods,
                  },
                });
              }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </label>
          <label htmlFor="input-text-url" id="label-url">
            Url:
            <input
              id="input-url"
              type="text"
              value={config.routes.url}
              onChange={(evt) => {
                setConfig({
                  ...config,
                  routes: {
                    ...config.routes,
                    url: evt.target.value,
                  },
                });
              }}
            />
          </label>

          <label htmlFor="input-text-sql" id="label-sql">
            Sql:
            <textarea
              id="input-sql"
              value={config.routes.sql}
              onChange={(evt) => {
                setConfig({
                  ...config,
                  routes: {
                    ...config.routes,
                    sql: evt.target.value,
                  },
                });
              }}
              title="Sql"
            />
          </label>
          <button className="button-api" type="submit">
            Salvar
          </button>
        </form>
      </section>
    </ApiConfig>
  );
}
