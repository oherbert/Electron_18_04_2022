import { createContext, useEffect, useReducer } from 'react';
import { GlobalStyles } from 'renderer/styles/global-styles';
import { darkTheme, lightTheme } from 'renderer/styles/themes';
import { IGlobalState } from 'renderer/types/renderTypes';
import { ThemeProvider } from 'styled-components';
import globalState from './globalState';
import reducer from './reducer';

interface IContextApp {
  children: React.ReactChild | React.ReactChild[];
}

const { on, setRadioBtnTrue } = window.electron.ipcRenderer;

export const Context = createContext<IGlobalState>(globalState);

export const AppContext: React.FC<IContextApp> = ({
  children,
}: IContextApp) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  useEffect(
    () =>
      dispatch([
        {
          type: 'userTheme',
          payload:
            localStorage.getItem('userTheme') === 'dark' ? 'dark' : 'light',
        },
        {
          type: 'job',
          payload: localStorage.getItem('job') === 'Start' ? 'Start' : 'Stop',
        },
      ]),
    []
  );

  useEffect(() => setRadioBtnTrue(state.job), [state.job]);

  // Chanel that receives theme from window
  on('theme', (msg) => {
    dispatch({
      type: 'userTheme',
      payload: msg,
    });
  });

  on('job', (msg) =>
    dispatch({
      type: 'job',
      payload: msg,
    })
  );

  return (
    <ThemeProvider theme={state.userTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Context.Provider value={{ ...state, dispatch }}>
        {Array.isArray(children) ? children.map((child) => child) : children}
      </Context.Provider>
    </ThemeProvider>
  );
};
