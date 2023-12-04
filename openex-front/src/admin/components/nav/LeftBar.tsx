import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import {
  DashboardOutlined,
  RowingOutlined,
  GroupsOutlined,
  DescriptionOutlined,
  ExtensionOutlined,
  SettingsOutlined,
  DomainOutlined,
  EmojiEventsOutlined,
  SchoolOutlined,
} from '@mui/icons-material';
import { NewspaperVariantMultipleOutline } from 'mdi-material-ui';
import { makeStyles } from '@mui/styles';
import { useFormatter } from '../../../components/i18n';
import { Theme } from '../../../components/Theme';
import { useHelper } from '../../../store';
import { UsersHelper } from '../../../actions/helper';

const useStyles = makeStyles<Theme>((theme) => ({
  drawerPaper: {
    minHeight: '100vh',
    width: 190,
    background: 0,
    backgroundColor: theme.palette.background.nav,
  },
  menuList: {
    height: '100%',
  },
  lastItem: {
    bottom: 0,
  },
  logoButton: {
    marginLeft: -23,
    marginRight: 20,
  },
  logo: {
    cursor: 'pointer',
    height: 35,
  },
  toolbar: theme.mixins.toolbar,
  menuItem: {
    height: 35,
    fontWeight: 500,
    fontSize: 14,
  },
  menuItemNested: {
    height: 30,
    paddingLeft: 35,
  },
  menuItemText: {
    paddingTop: 1,
    fontWeight: 500,
    fontSize: 14,
  },
  menuItemNestedText: {
    paddingTop: 1,
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text?.secondary,
  },
}));

const LeftBar = () => {
  const location = useLocation();
  const classes = useStyles();
  const { t } = useFormatter();

  const userAdmin = useHelper((helper: UsersHelper) => {
    const me = helper.getMe();
    return me?.user_admin ?? false;
  });

  return (
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <Toolbar />
      <MenuList component="nav">
        <MenuItem
          component={Link}
          to="/admin"
          selected={location.pathname === '/admin'}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <DashboardOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Dashboard')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/exercises"
          selected={location.pathname.includes('/admin/exercises')}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <RowingOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Exercises')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/players"
          selected={location.pathname === '/admin/players'}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <GroupsOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Players')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/organizations"
          selected={location.pathname === '/admin/organizations'}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <DomainOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Organizations')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/documents"
          selected={location.pathname === '/admin/documents'}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <DescriptionOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Documents')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/medias"
          selected={location.pathname.includes('/admin/medias')}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <NewspaperVariantMultipleOutline fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Medias')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/challenges"
          selected={location.pathname === '/admin/challenges'}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <EmojiEventsOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Challenges')}
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/lessons"
          selected={location.pathname.includes('/admin/lessons')}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <SchoolOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Lessons learned')}
          />
        </MenuItem>
      </MenuList>
      <Divider />
      <MenuList component="nav">
        <MenuItem
          component={Link}
          to="/admin/integrations"
          selected={location.pathname === '/admin/integrations'}
          dense={true}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon style={{ minWidth: 30 }}>
            <ExtensionOutlined fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.menuItemText }}
            primary={t('Integrations')}
          />
        </MenuItem>
        {userAdmin && (
          <MenuItem
            component={Link}
            to="/admin/settings"
            selected={location.pathname.includes('/admin/settings')}
            dense={true}
            classes={{ root: classes.menuItem }}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <SettingsOutlined fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.menuItemText }}
              primary={t('Settings')}
            />
          </MenuItem>
        )}
      </MenuList>
    </Drawer>
  );
};

export default LeftBar;