import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./Navbar.style";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

function Navbar() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="default"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.navLinks}>
              BooksApp
            </Link>
          </Typography>

          <Hidden mdDown>
            <div className={classes.appBarContent}>
              <Link to="/about" className={classes.navLinks}>
                About Us
              </Link>
            </div>
            <div className={classes.appBarContent}>
              <Link to="/contact" className={classes.navLinks}>
                Contact Us
              </Link>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={openDrawer}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          className={classes.closeMenuButton}
        >
          <CloseIcon />
        </IconButton>
        <Box className={classes.links}>
          <div className={classes.navbarDrawerLinks}>
            <Link
              to="/"
              className={`${classes.navLinks} ${classes.drawerLinks}`}
              onClick={handleDrawerToggle}
            >
              Home
            </Link>
          </div>
          <div className={classes.navbarDrawerLinks}>
            <Link
              to="/about"
              className={`${classes.navLinks} ${classes.drawerLinks}`}
              onClick={handleDrawerToggle}
            >
              About Us
            </Link>
          </div>
          <div className={classes.navbarDrawerLinks}>
            <Link
              to="/contact"
              className={`${classes.navLinks} ${classes.drawerLinks}`}
              onClick={handleDrawerToggle}
            >
              Contact Us
            </Link>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

export default Navbar;
