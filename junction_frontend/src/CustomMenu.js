import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link } from "react-router-dom";

class CustomMenu extends Component
{
    render() {
        return (
            <div>
                <Menu mode="horizontal" >
                    <Menu.Item className="modified-item" key="Profile" style={{width: '33.3%', borderRight: '1px solid black'}}>Profile
                        <Link to="/"></Link> 
                    </Menu.Item>
                    <Menu.Item className="modified-item" key="Inventory" style={{width: '33.3%', borderRight: '1px solid black'}}>Inventory
                        <Link to="/inventory"></Link>
                    </Menu.Item>
                    <Menu.Item className="modified-item" key="Recipes"style={{width: '33.3%'}}>Recipes
                        <Link to="/recipes" ></Link> 
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default CustomMenu