import { Reducer } from 'redux';

import { SidebarState, SidebarTypes } from './types';

const INITIAL_STATE: SidebarState = {
  open: true,
  menuList: JSON.parse(localStorage.getItem('@AltranApp:menu'))
};

const reducer: Reducer<SidebarState> = (
  state: SidebarState = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case SidebarTypes.TOGGLE_SIDEBAR:
      return { ...state, open: !state.open };
    case SidebarTypes.LOAD_MENU_REQUEST:
      return { ...state };
    case SidebarTypes.LOAD_MENU_SUCCESS:
      localStorage.setItem(
        '@AltranApp:menu',
        JSON.stringify(action.payload.menuList)
      );
      return { ...state, menuList: action.payload.menuList };
    default:
      return state;
  }
};

export default reducer;
