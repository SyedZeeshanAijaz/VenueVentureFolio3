import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import  { useEffect, useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

///icons
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

///components import
import BookingComponent from './BookingComponent';
import VenueComponent from './VenueComponent';
import ReservationComponent from './ReservationComponent';
import AdminHome from './AdminHome';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(
    // Retrieve the selected category from local storage or set it to null if not present
    () => localStorage.getItem('selectedCategory') || null
  );

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (component, category) => {
    setSelectedComponent(component);
    setSelectedCategory(category);
    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', category);
  };

  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  // Trigger click on the selected category button once after component mounts
  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryButton = document.querySelector('.selectedCategory');
      if (selectedCategoryButton) {
        selectedCategoryButton.click();
      }
    }
  }, [selectedCategory]);
  // const handleMenuItemClick = (component) => {
  //   setSelectedComponent(component);
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#042d66' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>

          {/* Logout button at the right corner */}
          <div className='nav__btns d-flex align-items-center gap-2' style={{ marginLeft: 'auto' }}>
          {
                           user ? <> <h5 className='mb-0' style={{color: 'white'}}>{user.username}</h5>
                                 <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                              </> : <>
                                 <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                                 <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                              </>
                        }          </div>
                        
                     <span className="mobile__menu" onClick={toggleMenu}>
                        <i class="ri-menu-line"></i>
                     </span>
        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Home', component: <AdminHome />, icon: <HouseRoundedIcon /> },
            { text: 'Reservations', component: <ReservationComponent />, icon: <BookOnlineIcon /> },
            { text: 'Bookings', component: <BookingComponent />, icon: <AutoStoriesRoundedIcon /> },
            { text: 'Venues', component: <VenueComponent />, icon: <LocationOnRoundedIcon /> },
          ].map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: 'block' }}
              component="div"
            >
              <ListItemButton
                onClick={() => handleMenuItemClick(item.component, item.text)}
                className={selectedCategory === item.text ? 'selectedCategory' : ''}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: selectedCategory === item.text ? '#ffffff' : '#042d66',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  '&.selectedCategory': {
                    backgroundColor: '#042d66',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: selectedCategory === item.text ? '#ffffff' : '#042d66',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {selectedComponent} {/* Render the selected component */}
      </Box>
    </Box>

    
  );
}
