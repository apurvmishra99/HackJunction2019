import React, { Component, useState, useEffect } from 'react'
import './index.css'
import CustomMenu from './CustomMenu';
import Header from './Header.js'
import axios from 'axios';
import { Button, Divider } from 'antd'

const RecipeList = ({ }) => {
  const [recipes, setRecipes] = useState('')

//Put the address between semicolons.

  useEffect(() => {
    axios
      .post('', { userID: 2 })
      .then(response => {
        console.log(response)
        setRecipes(response.data)
      })
  }, [])

  //item... needs to be changed

   if (recipes !== '') {
     return (
      <div>
      {recipes.map(item =>
         <div className="InventoryList">
           <div className="w3-content w3-padding">
             <div id="ingredients" className="w3-container w3-padding-32"></div>
               <div className="w3-row-padding">
                 <div className="w3-col w3-margin-bottom">
                   <div className="w3-display-container">
                     <div className="w3-display-topleft w3-padding" style={{marginTop:"-10px", marginLeft:"-10px"}}>{item.item_name}</div>
                       <img src={item.item_picture} style={{width:'100%'}}></img>
                     </div>
                     <section className="recipe-card-overview" style={{borderBottom: '1px solid #e5e5e5', borderRight: '1px solid #e5e5e5', borderLeft: '1px solid #e5e5e5'}}>
                     <div className="recipe-card-info">
                       <span className="recipe-quantity">Quantity: {item.item_quantity}</span>
                       <span className="recipe-card-preparation-time">Expiry Date: {item.expiry_date}</span>
                     </div>
                     <Divider />
                     <Button type="primary" size="small" style={{marginTop:"-20px", font:"8px", backgroundColor: "beige", color: "black", borderColor: "beige"}} block>
                       Use in recipe
                     </Button>
                     </section>
                     </div>
                   </div>
                 </div>
               </div>
        )}
      </div>
           )
 } else return (<div></div>)
 }

class Recipes extends Component {
  
  render() {
    return (
      <div>       
        <Header pageName={"Recipes"}></Header>
        <RecipeList/>
        <CustomMenu/>
      </div>
    );
  }
}

export default Recipes