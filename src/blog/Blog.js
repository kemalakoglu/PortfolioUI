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

let sections = [];

let featuredPosts = [];

let posts = [];

let archives = [];

const sidebar = {
  title: 'About',
  description:
    'I have been working as software development specialist at Turkish Airlines since February 2019.\n' +
      '\n' +
      'I graduated from Ankara University Faculty of Education Science in 2012 and started my proffesional carrier as a IT teacher in Ankara University Anatolian Vocational High School in 2013. I had worked Uz Consulting(2014-2014) , Pro-line (2014-2016), Enocta (2016-2016) and Innova IT Solutions (2016-2019) as software engineer before.\n' +
      '\n' +
      'Specialties: Web Development, Agile, Software Development, Documentation ',
  social: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kemalakoglu/' },
      { name: 'GitHub', url: 'https://github.com/kemalakoglu' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com/kemalakoglu' },
      { name: 'Medium', url: 'https://medium.com/@kemal.akoglu01' }
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

      sections = [];
      featuredPosts = [];
      posts = [];

      data.data.sections.forEach(function (item) {
          if(item.name=="Home")
              sections.push({title: item.name, url: '/#'})
          else
              sections.push({title: item.name, url: 'Content?Id=' + item.id})
      });

    const mainFeaturedPost = {
        title: data.data.featuredPosts[0].description,
        description:data.data.featuredPosts[0].value.substr(0,100),
        imgText: data.data.featuredPosts[0].name,
        image: 'https://images.unsplash.com/photo-1576521532404-5a3a80dc3937?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        linkText: 'Continue reading…',
        link:'Page?id='+data.data.featuredPosts[0].id,
      };

    data.data.featuredPosts.forEach(function (item) {
      featuredPosts.push(  {
            title: item.name,
            date: item.updateDate,
            description: item.value.substr(0,100),
            image: item.image,
            imageText: item.imageText,
          linkText: 'Continue reading…',
          link:'Page?id='+item.id,
          });

    });

    data.data.latestPosts.forEach(function (item) {
      posts.push({
        title: item.name,
        date: item.updateDate,
        description: item.value,
        image: item.image,
        imageText: item.imageText,
          linkText: 'Continue reading…',
          link:'Page?id='+item.id,
      });
    });

    data.data.archives.forEach(function (item) {
       archives.push(    { title: item.title, url: item.url },)
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
                    <FeaturedPost key={post.description} post={post} />
                ))}
              </Grid>
              <Grid container className={classes.mainGrid}>

                  <Grid xs={12} md={9}>
                {posts.map(post => (
                    <Main title={post.title} description={post.description} key={post.title} link={post.link} linkText={post.linkText} posts={posts}/>
                ))}

                  </Grid>
                  <Sidebar
                      title={sidebar.title}
                      description={sidebar.description}
                      archives={archives}
                      social={sidebar.social}/>


              </Grid>
            </main>
          </Container>
          <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </React.Fragment>
    );
  }
}
