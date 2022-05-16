import execSql from './functions/execSql';
import { IAction, IGlobalState } from '../types/renderTypes';
import getDBConfig from './functions/getDBConfig';
import saveDBConfig from './functions/saveDBConfig';
import getApiConfig from './functions/getApiConfig';
import saveApiConfig from './functions/saveApiConfig';

const globalState: IGlobalState = {
  userTheme: 'dark',
  job: 'Stop',
  execSql,
  getDBConfig,
  saveDBConfig,
  getApiConfig,
  saveApiConfig,
  dispatch: (action: IAction | IAction[]) =>
    // eslint-disable-next-line no-console
    console.log(`Override dispatch on globalState ${action}`),
};

export default globalState;
