import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './Footer';
import {Container, makeStyles} from "@material-ui/core";
import {useAsync} from "react-async";
import Grid from '@material-ui/core/Grid';
import FeaturedPost from "./FeaturedPost";
import MainFeaturedPost from "./MainFeaturedPost";
import Header from "./Header";

let sections = [];
let featuredPosts = [];

function getUrlVars() {

    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

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


const GetRefValuesByRefTypeId = async () =>
    await fetch('http://localhost:8080/api/Blog/GetRefValueForBlogsByRefTypeId?Id=' + getUrlVars()["Id"])
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

export default function Content() {
    const classes = useStyles();
    sections = [];
    featuredPosts = [];

    const {data, error, isLoading} = useAsync({promiseFn: GetRefValuesByRefTypeId});
    if (isLoading) return "Loading...";
    if (error) return `Something went wrong: ${error.message}`;
    if (data) {
        data.data.sections.forEach(function (item) {
            if(item.name==="Home")
                sections.push({title: item.name, url: '/#'})
            else
                sections.push({title: item.name, url: 'Content?Id=' + item.id})
        });

        if (data.data.contents.length > 0) {
            data.data.contents.forEach(function (item) {
                    featuredPosts.push({
                        title: item.name,
                        date: item.updateDate,
                        description: item.value.substr(0, 100),
                        image: item.image,
                        imageText: item.imageText,
                        linkText: 'Continue reading…',
                        link: 'Page?id=' + item.id,
                    });
            });
        }

        const mainFeaturedPost = {
            title: data.data.contents[0].description,
            description: data.data.contents[0].value.substr(0, 100),
            imgText: data.data.contents[0].name,
            image: 'https://images.unsplash.com/photo-1576521532404-5a3a80dc3937?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            linkText: 'Continue reading…',
            link: 'Page?id=' + data.data.contents[0].id,
        };


        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Header title="Kemal Akoglu" sections={sections}/>
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost}/>
                        <Grid container spacing={4}>
                            {featuredPosts.map(post => (
                                <FeaturedPost key={post.description} post={post}/>
                            ))}
                        </Grid>
                    </main>
                </Container>
                <Footer title="Footer" description="Something here to give the footer a purpose!"/>
            </React.Fragment>
        );
    }
}
