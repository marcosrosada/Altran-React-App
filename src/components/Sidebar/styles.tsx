import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import styled from 'styled-components';

interface MyProps {
  weight?: string;
  // etc...
}

export const StyledList = styled(List)`
  padding: 0;
`;

export const StyledListItem = styled(ListItem)`
  height: 45px;
  background: ${props => props.color || '#FFF'};
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 0;
  padding-right: 10px;
`;

export const StyledListItemText = styled(ListItemText)<MyProps>`
  span {
    font-size: 14px;
    font-family: Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    line-height: 2px;
    letter-spacing: normal;
    font-weight: ${props => props.weight || 'normal'} !important;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: 0
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    nested: {
      paddingLeft: 10 * 4
    }
  })
);

export default useStyles;
