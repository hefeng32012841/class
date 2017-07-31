import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import store from './store';

import App from './App';
import Home from './views/Home';

import RouteMap from './RoutesMap';
import "./style/index.less";

const routes = RouteMap.routes;

const customHistory = createBrowserHistory();

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={customHistory}>
                    <div>
                        <App>
                            <Route exact key="/" path="/" component={Home} />
                            {routes.map(route => <Route exact key={route.path} {...route} />)}
                        </App>
                    </div>
                </Router>
            </Provider>
        )
    }
}
