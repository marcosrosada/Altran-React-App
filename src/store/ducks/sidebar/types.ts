/**
 * Actions Types
 */
export enum SidebarTypes {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  LOAD_MENU_REQUEST = 'LOAD_MENU_REQUEST',
  LOAD_MENU_SUCCESS = 'LOAD_MENU_SUCCESS'
}

/**
 * Data Types
 */
export interface Menu {
  id: number;
  open: boolean;
  icon: string;
  label: string;
  path: string;
  children: Array<Menu>;
}

/**
 * State Types
 */
export interface SidebarState {
  readonly open: boolean;
  readonly menuList: Menu[];
}
