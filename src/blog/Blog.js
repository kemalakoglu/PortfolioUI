import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAsync } from 'react-async';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [];

const featuredPosts = [];

const posts = [];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
  ],
};

 const GetHomeData = async() =>
  await fetch('https://localhost:44364/api/Blog/GetHomeData')
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json());

export default function Blog() {
  const classes = useStyles();

  const { data, error, isLoading } = useAsync({ promiseFn: GetHomeData});
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data){
    data.data.sections.forEach(function(item){
      sections.push({ title: item.name , url: '#' })});

    const mainFeaturedPost = {
        title: data.data.featuredPosts[0].name,
        description:data.data.featuredPosts[0].value.substr(0,100),
        imgText: data.data.featuredPosts[0].name,
        image: 'https://images.unsplash.com/photo-1576521532404-5a3a80dc3937?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        linkText: 'Continue reading…',
      };

    data.data.featuredPosts.forEach(function (item) {
      featuredPosts.push(  {
            title: item.name,
            date: item.updateDate,
            description: item.value.substr(0,100),
            image: 'https://source.unsplash.com/random',
            imageText: 'Image Text',
          });

    });

    data.data.latestPosts.forEach(function (item) {
      posts.push({
        title: item.name,
        date: item.updateDate,
        description: item.value,
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
      });
    });

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header title="Kemal Akoglu" sections={sections}  />
            <main>
              <MainFeaturedPost post={mainFeaturedPost} />
              <Grid container spacing={4}>
                {featuredPosts.map(post => (
                    <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
              <Grid container spacing={5} className={classes.mainGrid}>
                {posts.map(post => (
                    <Main title={post.title} description={post.description} key={post.title} posts={posts}/>
                ))}
                <Sidebar
                  title={sidebar.title}
                  description={sidebar.description}
                  archives={sidebar.archives}
                  social={sidebar.social}
              />
              </Grid>
            </main>
          </Container>
          <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </React.Fragment>
    );
  }
}
