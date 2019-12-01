import React, { Component, useState, useEffect } from 'react'
import './index.css'
import CustomMenu from './CustomMenu';
import Header from './Header.js'
import axios from 'axios';
import { Button, Divider } from 'antd';
import Layout from './Layout'


const ItemList = ({ }) => {
  const [inventory, setInventory] = useState('')

  useEffect(() => {
    axios
      .post('http://localhost:5000/get-inventory', { userID: 2 })
      .then(response => {
        console.log(response)
        setInventory(response.data)
      })
  }, [])

   if (inventory !== '') {
     return (
       <Layout inventory={inventory}/> 
           )
 } else return (<div></div>)
 }

class Inventory extends Component {
  
  render() {
    return (
      <div>
        <Header pageName={"Inventory"}/>
        <ItemList/>
        <CustomMenu/>
      </div>
    )
  }
}

export default Inventory