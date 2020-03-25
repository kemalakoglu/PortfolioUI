import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function CustomHeader(props) {
  const classes = useStyles();
  const { menus, mainTitle } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
       {/* <Button size="small">Subscribe</Button>*/}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {mainTitle}
        </Typography>
        <IconButton>
        </IconButton>
     {/*   <Button variant="outlined" size="small">
          Sign up
        </Button>*/}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {menus.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href = {'Content?Id='+ section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

CustomHeader.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
