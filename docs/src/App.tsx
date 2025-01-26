/*
 *   Copyright (c) 2024-2025 Robin E. R. Davies
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import React, { useEffect } from 'react';
import logo from '/logo.svg'
import VolunteerLoveIconWhite from './assets/volunteer_love_24_white.svg'
import VolunteerLoveIcon from './assets/volunteer_love_24.svg'

import './App.css';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ApiIcon from '@mui/icons-material/Api';
import ArrowDropdownIcon from '@mui/icons-material/ArrowDropDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Divider from '@mui/material/Divider'
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary'
import { DocsRoutes } from './DocsNav';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useNavigationTracker } from './NavigationType';
import MainPageSearchBox from './MainPageSearchBox';
import Collapse from '@mui/material/Collapse';


function ToolbarTooltip(props: { title: string, children: React.ReactElement, placement: 'bottom' | 'bottom-end' | 'bottom-start' | undefined }
) {
    return (
        <Tooltip color="black" arrow disableFocusListener disableTouchListener title={(

            <Typography noWrap variant="h6" style={{ fontSize: "16px" }}>{props.title}</Typography>
        )} placement={props.placement} enterDelay={1250} enterNextDelay={750}
            slotProps={{
                tooltip: { style: { background: "#000", color: "#FFF", opacity: 0.9 } },
                arrow: { style: { color: "#000", opacity: 0.9 } },
                popper: { style: { paddingBottom: 4 } }
            }}
        >
            {props.children}
        </Tooltip>
    );
}



function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchOpen, setSearchOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const { startTracking, stopTracking } = useNavigationTracker(() => { })
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
    const compactNavBar = windowWidth < 600 && !isSearchPage;
    const fullNavBar = !compactNavBar && !isSearchPage;

    const hideNavBar = windowWidth < 879 && searchOpen;

    const drawerShowSponsorship = () => {
        window.open("https://github.com/sponsors/rerdavies", "_blank");
        setDrawerOpen(false);


    }
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
                <ListItem>
                    <ListItemButton onClick={() => drawerShowSponsorship()}>
                        <ListItemIcon>
                            <img src={VolunteerLoveIcon} />
                        </ListItemIcon>
                        <ListItemText primary="GitHub" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <div className="app_frame" style={{ backgroundColor: isSearchPage ? "#000024" : "#242424", transition: "background-color 0.5s" }}>
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
            <div className='no_print'>
                <Toolbar style={{ overflowX: "hidden", overflowY: "hidden" }}>
                    <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
                        <Collapse in={isSearchPage} orientation='horizontal' timeout={75}>
                            <IconButton color="inherit" disabled={!isSearchPage} onClick={() => {
                                history.back();
                            }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Collapse>

                        {isSearchPage && (

                            <React.Fragment>
                                <Button color="inherit" style={{ color: "#FFFFFF", textTransform: "none", borderWidth: 0, fontSize: "1.25em", marginRight: 32, fontWeight: 700 }}
                                    disabled={true}
                                >
                                    <img src={logo} className="app_logo" alt="logo" />
                                    Search
                                </Button>

                            </React.Fragment>
                        )}

                        {fullNavBar && (<React.Fragment>
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
                                <MainPageSearchBox open={searchOpen} onOpen={(open) => { setSearchOpen(open); }} />
                            )}
                            {!hideNavBar && (
                                <div style={{ color: "#FFF", marginLeft: 8, flex: "0 0 auto" }}>
                                    <ToolbarTooltip title="NWindow github Repository" placement='bottom-end'>
                                        <IconButton color="inherit" onClick={() => {
                                            window.open("https://github.com/rerdavies/nwindows/", "_blank");
                                        }}>
                                            <GitHubIcon />
                                        </IconButton>
                                    </ToolbarTooltip>
                                </div>
                            )}
                            {!hideNavBar && (
                                <div style={{ color: "#FFF", marginLeft: 8, flex: "0 0 auto" }}>
                                    <ToolbarTooltip title="Sponsorship" placement='bottom-end'>
                                        <IconButton color="inherit" onClick={() => {
                                            window.open("https://github.com/sponsors/rerdavies", "_blank");
                                        }}>
                                            <img src={VolunteerLoveIconWhite} />
                                        </IconButton>
                                    </ToolbarTooltip>
                                </div>
                            )}

                        </React.Fragment>)
                        }
                        {compactNavBar &&
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
                                    <MainPageSearchBox open={searchOpen} onOpen={(open) => { setSearchOpen(open); }} />
                                )}

                            </React.Fragment>
                            )}
                    </div>
                </Toolbar >
                <Divider orientation='horizontal' variant="inset" style={{ height: 3 }} />
            </div>

            <ErrorBoundary>
                <DocsRoutes />
                {/*
                    <Outlet />
                */}
            </ErrorBoundary>
        </div >

    )
}

export default App
