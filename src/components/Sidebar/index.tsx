import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as SidebarActions from '../../store/ducks/sidebar/actions';
import { Menu } from '../../store/ducks/sidebar/types';

import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';

import {
  StyledList,
  StyledListItem,
  StyledListItemText,
  StyledListItemIcon
} from './styles';
import TrendingUp from '@material-ui/icons/TrendingUp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Settings from '@material-ui/icons/Settings';

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

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const classes = useStyles();

  const handleCollapseMenuClick = (e: Menu) => {
    const list = menuList.map(item => {
      if (item.id === e.id) {
        item.open = !item.open;
      }
      return item;
    });

    loadMenuSuccess(list);
  };

  const handleMenuClick = (index: number, subIndex: number) => {
    if (index && subIndex) {
      console.log(index + subIndex);

      setSelectedIndex(index + subIndex);
    }
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
      {menuList.map((item, index) => (
        <StyledList key={item.id}>
          {item.children != null ? (
            <div>
              <StyledListItem
                button
                onClick={() => handleCollapseMenuClick(item)}
              >
                <StyledListItemIcon>
                  <TrendingUp />
                </StyledListItemIcon>
                <StyledListItemText primary={item.label} weight="600" />
                {item.open ? <ExpandLess /> : <ExpandMore />}
              </StyledListItem>
              <Collapse
                component="li"
                in={item.open}
                timeout="auto"
                unmountOnExit
              >
                <StyledList disablePadding>
                  {item.children.map((subItem, subIndex) => (
                    <StyledListItem
                      button
                      key={subItem.id}
                      selected={selectedIndex === index + subIndex}
                      onClick={event => handleMenuClick(index, subIndex)}
                      color="#F5F5F5B8"
                      className={classes.nested}
                    >
                      <StyledListItemText
                        key={subItem.id}
                        primary={subItem.label}
                      />
                    </StyledListItem>
                  ))}
                </StyledList>
              </Collapse>{' '}
            </div>
          ) : (
            <StyledListItem
              button
              onClick={() => handleCollapseMenuClick(item)}
            >
              <StyledListItemIcon>
                <Settings />
              </StyledListItemIcon>
              <StyledListItemText primary={item.label} />
            </StyledListItem>
          )}
        </StyledList>
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
