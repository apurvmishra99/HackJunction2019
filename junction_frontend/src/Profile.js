import React, { Component } from 'react'
import { Button } from 'antd';
import './index.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import Header from './Header.js'
import CustomMenu from './CustomMenu';
import { Link } from "react-router-dom";

class Profile extends Component {
  
  render() {
    return (
      <div>
      <Header pageName={"Profile"}></Header>
      <div className="w3-content w3-padding">
        <div id="projects" className="w3-container w3-padding-32"></div>
        <div className="w3-row-padding">
          <div className="w3-col w3-margin-bottom">  
            <CircularProgressbar value={80} text={66} styles={buildStyles({
              pathColor: 'orange',
              textColor: 'orange',
              textSize: 13
            })}
            />
          </div>
        </div>
        <Link to="/addmeal">
        <Button icon="plus" style={{float:'right', margin:'20px'}}>Add Meal
        </Button>
        </Link>
      </div>
      <CustomMenu/>
      </div>
    );
  }
}

export default Profile;
