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
import { ListSC, ListItemSC } from './styles';
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

  const handleMenuClick = (
    e: Menu,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index?: number
  ) => {
    console.log(event);
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
      {menuList.map(item => (
        <ListSC key={item.id}>
          {item.children != null ? (
            <div>
              <ListItemSC
                button
                onClick={event => handleMenuClick(item, event)}
              >
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {item.open ? <ExpandLess /> : <ExpandMore />}
              </ListItemSC>
              <Collapse
                component="li"
                in={item.open}
                timeout="auto"
                unmountOnExit
              >
                <ListSC disablePadding>
                  {item.children.map(subItem => (
                    <ListItemSC
                      button
                      key={subItem.id}
                      color="#e6e6e6"
                      className={classes.nested}
                    >
                      <ListItemText key={subItem.id} primary={subItem.label} />
                    </ListItemSC>
                  ))}
                </ListSC>
              </Collapse>{' '}
            </div>
          ) : (
            <ListItemSC button onClick={event => handleMenuClick(item, event)}>
              <ListItemText primary={item.label} />
            </ListItemSC>
          )}
        </ListSC>
      ))}
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
