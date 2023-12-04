import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { AccountCircleOutlined } from '@mui/icons-material';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { logout } from '../../../actions/Application';
import logo from '../../../resources/images/logo_openex_horizontal_small.png';
import { useFormatter } from '../../../components/i18n';
import TopMenuDashboard from './TopMenuDashboard';
import TopMenuSettings from './TopMenuSettings';
import TopMenuExercises from './TopMenuExercises';
import TopMenuExercise from './TopMenuExercise';
import TopMenuPlayers from './TopMenuPlayers';
import TopMenuOrganizations from './TopMenuOrganizations';
import TopMenuDocuments from './TopMenuDocuments';
import TopMenuMedias from '../medias/TopMenuMedias';
import TopMenuIntegrations from './TopMenuIntegrations';
import TopMenuChallenges from './TopMenuChallenges';
import TopMenuLessons from './TopMenuLessons';
import ImportUploader from '../exercises/ImportUploader';
import TopMenuMedia from './TopMenuMedia';
import TopMenuProfile from './TopMenuProfile';
import { Theme } from '../../../components/Theme';
import { useAppDispatch } from '../../../utils/hooks';

const useStyles = makeStyles<Theme>((theme) => ({
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    background: 0,
    backgroundColor: theme.palette.background.nav,
    paddingTop: theme.spacing(0.2),
  },
  flex: {
    flexGrow: 1,
  },
  logoContainer: {
    marginLeft: -10,
  },
  logo: {
    cursor: 'pointer',
    height: 35,
  },
  menuContainer: {
    float: 'left',
    marginLeft: 30,
  },
  barRight: {
    position: 'absolute',
    top: 15,
    right: 15,
    verticalAlign: 'middle',
    height: '100%',
  },
  divider: {
    display: 'table-cell',
    float: 'left',
    height: '100%',
    margin: '0 5px 0 5px',
  },
  searchContainer: {
    display: 'table-cell',
    float: 'left',
    marginRight: 5,
    paddingTop: 9,
  },
}));

const TopBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<MenuProps['anchorEl']>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const classes = useStyles();
  const { t } = useFormatter();

  const handleOpen = (event: React.MouseEvent) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    setOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      variant="elevation"
      elevation={1}
    >
      <Toolbar>
        <div className={classes.logoContainer}>
          <Link to="/admin">
            <img src={`/${logo}`} alt="logo" className={classes.logo} />
          </Link>
        </div>
        <div className={classes.menuContainer}>
          {(location.pathname === '/admin'
            || location.pathname.includes('/admin/import')) && (
              <TopMenuDashboard />
          )}
          {location.pathname === '/admin/exercises' && <TopMenuExercises />}
          {location.pathname.includes('/admin/exercises/') && (
            <TopMenuExercise />
          )}
          {location.pathname.includes('/admin/players') && <TopMenuPlayers />}
          {location.pathname.includes('/admin/organizations') && (
            <TopMenuOrganizations />
          )}
          {location.pathname.includes('/admin/documents') && (
            <TopMenuDocuments />
          )}
          {location.pathname === '/admin/medias' && <TopMenuMedias />}
          {location.pathname.includes('/admin/medias/') && <TopMenuMedia />}
          {location.pathname.includes('/admin/challenges') && (
            <TopMenuChallenges />
          )}
          {location.pathname.includes('/admin/lessons') && <TopMenuLessons />}
          {location.pathname.includes('/admin/integrations') && (
            <TopMenuIntegrations />
          )}
          {location.pathname.includes('/admin/settings') && (
            <TopMenuSettings />
          )}
          {location.pathname.includes('/admin/profile') && (
            <TopMenuProfile />
          )}
        </div>
        <div className={classes.barRight}>
          <Button component={ImportUploader}>{t('Import exercise')}</Button>
          <IconButton onClick={handleOpen}
            size="small"
            color={location.pathname === '/admin/profile' ? 'secondary' : 'default'}>
            <AccountCircleOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/admin/profile"
            >
              {t('Profile')}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {t('Logout')}
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;