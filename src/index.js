import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Blog from "./blog/Blog";
import Page from "./blog/Page";
import Content from "./blog/Content";
import Archive from "./blog/Archive";

const routing = (
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router>
                <Route exact path="/" component={Blog} />
                <Route exact path="/Page" component={Page} />
                <Route exact path="/Content" component={Content} />
                <Route exact path="/Archive" component={Archive}/>
        </Router>
    </ThemeProvider>
);

ReactDOM.render(routing,  document.querySelector('#root'));
