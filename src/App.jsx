import React, { Component } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import RouteMap from './RoutesMap';
const links = RouteMap.links;
export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar links={links} />
                <Header />
                <div className="main">{this.props.children}</div>
            </div>
        )
    }
}