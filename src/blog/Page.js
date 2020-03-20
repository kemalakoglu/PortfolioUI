import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import {useAsync} from "react-async";
import {makeStyles} from "@material-ui/core";
import CustomHeader from "./CustomHeader";
import ReactHtmlParser from "react-html-parser";
import Grid from "./Blog";

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

var menus = [];

const GetById = async () =>
    await fetch('https://localhost:44364/api/Blog/GetById?Id=' + getUrlVars()["id"])
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

const GetHomeData = async () =>
    await fetch('https://localhost:44364/api/Blog/GetHomeData')
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

export default function Page() {
    const classes = useStyles();
    menus = [];
    const {data, error, isLoading} = useAsync({promiseFn: GetById});
    if (isLoading) return "Loading...";
    if (error) return `Something went wrong: ${error.message}`;
    if (data) {
        data.data.sections.forEach(function(item){
            menus.push({ title: item.name , url: '#' })});

        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <CustomHeader mainTitle="Kemal Akoglu" menus={menus}/>
                    <h1>{ReactHtmlParser(data.data.content.description)}</h1>
                    {ReactHtmlParser(data.data.content.value)}
                </Container>
                <Footer title="Footer" description="Something here to give the footer a purpose!"/>
            </React.Fragment>
        );
    }
}
