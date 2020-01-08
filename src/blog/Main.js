import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import CardContent from "./FeaturedPost";


const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
    const classes = useStyles();
    const {posts, title, description} = props;
    return (
        /*    <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Divider />
              {posts.map(post =>(
                <Markdown className={classes.markdown} key={post.title}/>
              ))}
            </Grid>};*/
        <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography paragraph>
                {description}
            </Typography>
            <Typography paragraph>
                {posts.map(post => (
                    <Markdown className={classes.markdown} key={post.title}/>
                ))}
            </Typography>
        </Grid>
    )
}

Main.propTypes = {
  posts: PropTypes.object,
};
