import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import {useAsync} from "react-async";
import {makeStyles} from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import Header from "./Header";

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
    await fetch('http://localhost:8080/api/Blog/GetById?Id=' + getUrlVars()["id"])
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

export default function Page() {
    const classes = useStyles();
    menus = [];
    const {data, error, isLoading} = useAsync({promiseFn: GetById});
    if (isLoading) return "Loading...";
    if (error) return `Something went wrong: ${error.message}`;
    if (data) {
        data.data.sections.forEach(function (item) {
            if(item.name==="Home")
                menus.push({title: item.name, url: '/#'})
            else
                menus.push({title: item.name, url: 'Content?Id=' + item.id})
        });

        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Header title="Kemal Akoglu" sections={menus}/>
                    <h1>{ReactHtmlParser(data.data.content.description)}</h1>
                    {ReactHtmlParser(data.data.content.value)}
                </Container>
                <Footer title="Footer" description="Something here to give the footer a purpose!"/>
            </React.Fragment>
        );
    }
}
