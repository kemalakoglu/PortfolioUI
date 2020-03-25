import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Markdown from './Markdown';
import ReactHtmlParser from 'react-html-parser';


const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
      marginTop: theme.spacing(3,0),
  },
}));

export default function Main(props) {
    const classes = useStyles();
    const {posts, title, description, link, linkText} = props;
    return (
        <Grid item xs={12} md={11}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography paragraph>
                {ReactHtmlParser(description)}
            </Typography>
            <Typography paragraph>
                {posts.map(post => (
                    <Markdown className={classes.markdown} key={post.title}/>
                ))}
            </Typography>
            <Typography variant="subtitle1" color="primary">
            <a href={link}>{linkText}</a>
            </Typography>
        </Grid>
    )
}

Main.propTypes = {
  posts: PropTypes.object,
};
