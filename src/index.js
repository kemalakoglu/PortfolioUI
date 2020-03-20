import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Blog from "./blog/Blog";
import Page from "./blog/Page";

const routing = (
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router>
                <Route exact path="/" component={Blog} />
                <Route path="/Page/" component={Page} />
        </Router>
    </ThemeProvider>
);

ReactDOM.render(routing,  document.querySelector('#root'));
