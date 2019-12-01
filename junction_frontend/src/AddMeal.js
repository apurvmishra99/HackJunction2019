import React, { Component } from 'react';
import CustomMenu from './CustomMenu'
import Header from './Header'
import { Search, Button, Divider, Input, Icon } from 'antd'

class AddMeal extends Component {
  
    render() {
      return (
          <div>
            <Header pageName={"AddMeal"}></Header>
            <CustomMenu></CustomMenu>   
            <div className="SearchBar">
            <Input
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Search Recipe"
            />

            </div>            
          </div>
      )
    }
}

export default AddMeal;
