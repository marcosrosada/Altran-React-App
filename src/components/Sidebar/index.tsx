import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as SidebarActions from '../../store/ducks/sidebar/actions';
import { Menu } from '../../store/ducks/sidebar/types';

import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import TrendingUp from '@material-ui/icons/TrendingUp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useStyles from './styles';

interface StateProps {
  open: boolean;
  menuList: Menu[];
}

interface DispatchProps {
  loadMenuRequest(): void;
  loadMenuSuccess(menuList: Menu[]): void;
}

type Props = StateProps & DispatchProps;

const Sidebar = ({
  open,
  menuList,
  loadMenuRequest,
  loadMenuSuccess
}: Props) => {
  useEffect(() => {
    if (menuList.length === 0) {
      loadMenuRequest();
    }
  }, [loadMenuRequest, menuList.length]);

  const classes = useStyles();

  const handleMenuClick = (e: Menu) => {
    const list = menuList.map(item => {
      if (item.id === e.id) {
        item.open = !item.open;
      }
      return item;
    });

    loadMenuSuccess(list);
    return {
      list
    };
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {/* {menuList.map(menu => (
          <div key={menu.id}>
            <ListItemText>{menu.label}</ListItemText>
            {menu.children.map(subMenu => (
              <ListItem button key={subMenu.id} onClick={handleMenuClick}>
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText primary={subMenu.label} />
              </ListItem>
            ))}
          </div>
        ))} */}
        {menuList.map(item => (
          <List key={item.id}>
            {item.children != null ? (
              <div>
                <ListItem button onClick={() => handleMenuClick(item)}>
                  <ListItemIcon>
                    <TrendingUp />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  component="li"
                  in={item.open}
                  timeout="auto"
                  unmountOnExit
                >
                  <List disablePadding>
                    {item.children.map(subItem => (
                      <ListItem
                        button
                        key={subItem.id}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <TrendingUp />
                        </ListItemIcon>
                        <ListItemText
                          key={subItem.id}
                          primary={subItem.label}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>{' '}
              </div>
            ) : (
              <ListItem button onClick={() => handleMenuClick(item)}>
                <ListItemText primary={item.label} />
              </ListItem>
            )}
          </List>
        ))}
      </List>
      {/* <Divider /> */}
    </Drawer>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  open: state.sidebar.open,
  menuList: state.sidebar.menuList
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SidebarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
