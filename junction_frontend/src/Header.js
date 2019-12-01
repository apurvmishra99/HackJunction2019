import React, { Component } from 'react'
import { Button, Divider } from 'antd';

class Header extends Component {
  
  render() {
    console.log(this.props);
    return (
      <div className="w3-top">
        <div className="w3-bar w3-padding" >
          <span>
            {this.props.pageName}
          </span>
          <span>
            <div className="w3-right">
              <Button icon="notification" size="small"/>
              <Button icon="tool" size="small"/>
            </div>
          </span>
        </div>
      </div>
    )
  }
}

export default Header