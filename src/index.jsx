import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import store from './store';

import RouteMap from './RoutesMap';
const routes = RouteMap.routes;
const links = RouteMap.links;

const customHistory = createBrowserHistory();

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={customHistory}>
                    <div>
                        <div>
                        {
                            links.map(link => {
                                return (
                                    <div key={link.name} className="nav-link">
                                        <Link {...link}>{link.name}</Link>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div>
                            {routes.map(route => <Route key={route.path} {...route} />)}
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}
