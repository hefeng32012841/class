import React, { PureComponent} from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export default class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultSelectedKeys: props.links[0].to || '',
            selectedKeys: ''
        }

        this.select = ::this.select;
    }

    select(e) {
        this.setState({
            selectedKeys:e.key
        })
    }

    render() {
        const { selectedKeys, defaultSelectedKeys } = this.state;
        return (
            <Menu
                className="nav-bar"
                defaultSelectedKeys={[defaultSelectedKeys]}
                selectedKeys={[selectedKeys]}
                onClick={this.select}
            >
            {
                this.props.links.map(link => {
                    return (
                        <Menu.Item key={link.name} className="nav-link">
                            <Link {...link}>{link.name}</Link>
                        </Menu.Item>
                    )
                })
            }
            </Menu>
        )
    }
}
