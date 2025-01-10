import React, { useEffect } from 'react';
import logo from '/logo.svg'

import './App.css';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ApiIcon from '@mui/icons-material/Api';
import ArrowDropdownIcon from '@mui/icons-material/ArrowDropDown';
import GitHubIcon from '@mui/icons-material/GitHub';

import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary'
import { DocsRoutes } from './DocsNav';
import SearchBox from './SearchBox';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useNavigationTracker  } from './NavigationType';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchOpen, setSearchOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const {startTracking,stopTracking} = useNavigationTracker(()=>{})
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        startTracking();

        return () => {
            stopTracking();
            window.removeEventListener('resize', handleResize);
        }
    })

    let isSearchPage = location.pathname === "/search";
    const compactNavBar = windowWidth < 600; 

    const hideNavBar = windowWidth < 790 && searchOpen;

    const drawerShowGithub = () => {
        window.open("https://github.com/rerdavies/nwindows/", "_blank");
        setDrawerOpen(false);
    }
    const drawerNavigate = (route: string) => {
        navigate(route);
        setDrawerOpen(false);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(!drawerOpen)}>
            <List>
                <ListItem>
                    <ListItemButton onClick={() => drawerNavigate("/")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => drawerNavigate("/documentation")}>
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => drawerNavigate("/apis")}>
                        <ListItemIcon>
                            <ApiIcon />
                        </ListItemIcon>
                        <ListItemText primary="APIs" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => drawerShowGithub()}>
                        <ListItemIcon>
                            <GitHubIcon />
                        </ListItemIcon>
                        <ListItemText primary="GitHub" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <div className="app_frame">
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClick={() => { setDrawerOpen(false); }}
                onClose={() => { setDrawerOpen(false); }}
            >
                <Toolbar style={{ backgroundColor: "#101010", color: "#FFFFFF" }}>
                    <img src={logo} className="app_logo" alt="logo" />
                    <p style={{
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                        fontSize: "20px",
                        fontWeight: 700
                    }}>NWindows</p>
                </Toolbar>
                {DrawerList}
            </Drawer>

            <Toolbar style={{ overflowX: "hidden", overflowY: "hidden" }}>
                <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
                    {!compactNavBar ? (<React.Fragment>
                        {!hideNavBar ?
                            (<React.Fragment>
                                {/************ REGULAR NAV BAR */}

                                <Button color="inherit" style={{ color: "#FFFFFF", textTransform: "none", borderWidth: 0, fontSize: "1.25em", marginRight: 32, fontWeight: 700 }}
                                    onClick={() => { navigate(""); }}
                                >
                                    <img src={logo} className="app_logo" alt="logo" />
                                    NWindows
                                </Button>
                                <Button style={{ marginLeft: 8, textTransform: "none", fontSize: "1.25em" }}
                                    onClick={() => { navigate("documentation"); }}
                                >
                                    Documentation
                                </Button>
                                <Button style={{ marginLeft: 8, textTransform: "none", fontSize: "1.25em", }}
                                    onClick={() => { navigate("apis"); }}
                                >APIs</Button>
                                <div style={{ flex: "1 1 1px" }} />
                            </React.Fragment>
                            )
                            : (
                                <div style={{ flex: "1 1 1px" }} />
                            )
                        }
                        {!isSearchPage && (
                            <SearchBox onSearchChangedWithDelay={() => { }} onOpen={(open) => { setSearchOpen(open); }}

                                onApplySearch={(searchString) => {
                                    navigate("search", { state: { initialSearchString: searchString } });
                                    return true;
                                }} />
                        )}
                        {!hideNavBar && (
                            <div style={{ color: "#FFF", marginLeft: 8 }}>
                                <IconButton color="inherit" onClick={() => {
                                    window.open("https://github.com/rerdavies/nwindows/", "_blank");
                                }}>
                                    <GitHubIcon />
                                </IconButton>
                            </div>
                        )}

                    </React.Fragment>) :
                        (<React.Fragment>
                            {/************* COMPACT NAV BAR */}
                            {!hideNavBar ?
                                (<React.Fragment>
                                    <Button onClick={() => { setDrawerOpen(!drawerOpen); }}>
                                        <img src={logo} className="app_logo" alt="logo"
                                            onClick={() => { setDrawerOpen(!drawerOpen); }}
                                        />
                                        <ArrowDropdownIcon htmlColor="#FF0000" />

                                    </Button>

                                    {location.pathname === "/" && (
                                        <Button color="inherit" focusVisibleClassName='no_border_button' style={{ marginLeft: 8, color: "#FFFFFF", textTransform: "none", borderWidth: 0, fontSize: "1.25em", marginRight: 32, fontWeight: 700 }}
                                            onClick={() => { navigate(""); }}
                                        >
                                            NWindows
                                        </Button>
                                    )}
                                    {(location.pathname !== "/" &&
                                        location.pathname !== "/search" &&
                                        !location.pathname.startsWith("/apis")) && (
                                            <Button style={{ marginLeft: 8, textTransform: "none", fontSize: "1.25em" }}
                                                onClick={() => { navigate("documentation"); }}

                                            >
                                                Documentation
                                            </Button>
                                        )}
                                    {location.pathname.startsWith("/apis") && (
                                        <Button style={{ marginLeft: 8, textTransform: "none", fontSize: "1.25em", }}
                                            onClick={() => { navigate("apis"); }}
                                        >APIs</Button>
                                    )}
                                    {location.pathname.startsWith("/search") && (
                                        <Button style={{ marginLeft: 8, textTransform: "none", fontSize: "1.25em", }}
                                            onClick={() => { }}
                                        >Search</Button>
                                    )}
                                    <div style={{ flex: "1 1 1px" }} />
                                </React.Fragment>
                                )
                                : (
                                    <div style={{ flex: "1 1 1px" }} />
                                )
                            }
                            {!isSearchPage && (
                                <SearchBox onSearchChangedWithDelay={() => { }} onOpen={(open) => { setSearchOpen(open); }}
                                    onApplySearch={(searchString) => {
                                        navigate("search", { state: { initialSearchString: searchString } });
                                        return true;
                                    }} />
                            )}

                        </React.Fragment>
                        )}
                </div>
            </Toolbar >
            <Divider orientation='horizontal' variant="inset" style={{ height: 3 }} />
            <Paper className="app_body">

                <ErrorBoundary>
                    <DocsRoutes />
                    {/*
                        <Outlet />
                    */}
                </ErrorBoundary>
            </Paper>
        </div >

    )
}

export default App
