import { action } from 'typesafe-actions';
import { SidebarTypes, Menu } from './types';

export const toggleSidebar = () => action(SidebarTypes.TOGGLE_SIDEBAR);
export const loadMenuRequest = () => action(SidebarTypes.LOAD_MENU_REQUEST);
export const loadMenuSuccess = (menuList: Menu[]) =>
  action(SidebarTypes.LOAD_MENU_SUCCESS, { menuList });
