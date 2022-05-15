import mainTheme from 'renderer/styles/mainTheme';
import execSql from './functions/execSql';
import { IAction, IGlobalState } from '../types/renderTypes';
import getDBConfig from './functions/getDBConfig';
import saveDBConfig from './functions/saveDBConfig';

const globalState: IGlobalState = {
  userTheme: 'dark',
  job: 'Stop',
  theme: mainTheme.lightTheme,
  execSql,
  getDBConfig,
  saveDBConfig,
  dispatch: (action: IAction | IAction[]) =>
    // eslint-disable-next-line no-console
    console.log(`Override dispatch on globalState ${action}`),
};

export default globalState;
