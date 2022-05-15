import { IAction, IGlobalState } from 'renderer/types/renderTypes';
import mainTheme from '../styles/mainTheme';

export default function reducer(
  state: IGlobalState,
  action: IAction | IAction[]
): IGlobalState {
  const arrAction: IAction[] = Array.isArray(action) ? action : [action];
  let newAction = { ...state };

  arrAction.forEach((act) => {
    if (Object.keys(state).includes(act.type)) {
      newAction = { ...newAction, [act.type]: act.payload };
      localStorage.setItem(act.type, act.payload);

      if (act.payload === 'dark') newAction.theme = mainTheme.darkTheme;
      else if (act.payload === 'light') newAction.theme = mainTheme.lightTheme;
    }
  });

  // console.log(action);

  return { ...newAction };
}
