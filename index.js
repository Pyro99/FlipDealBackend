const express = require('express');
const cors = require('cors')
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5 // 5%
let discountPercentage = 10 // 10%
let loyaltyRate = 2 // 2 points per 1$

app.get('/cart-total' , (req, res) =>{
  let  newItemPrice = parseFloat(req.query. newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = cartTotal + newItemPrice;
  res.send(totalCartPrice.toString());
})


app.get('/membership-discount' , (req, res) =>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let  isMember = req.query. isMember === "true";
  
  if(isMember){
    let discountedPrice = cartTotal - (cartTotal * (discountPercentage / 100));
    res.send(discountedPrice.toString());
  }
  res.send(cartTotal.toString());
})

app.get('/calculate-tax' , (req, res) =>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * (taxRate / 100);
  res.send(tax.toString());
})

function getShippingDays(shippingMethod,distance) {
  let deliveryDays;
  if(shippingMethod === "express"){
    deliveryDays = distance / 100;
    return deliveryDays;
 } else  if(shippingMethod === "standard"){
  deliveryDays = distance / 50;
  return deliveryDays;
}
}

app.get('/estimate-delivery' , (req, res) =>{
  let shippingMethod = req.query.shippingMethod;
  let  distance = parseFloat(req.query. distance);
  res.send(getShippingDays(shippingMethod,distance).toString());
  
})

app.get('/shipping-cost' , (req, res) =>{
  let weight = parseFloat(req.query.weight);
  let  distance = parseFloat(req.query. distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
  
})

app.get('/loyalty-points' , (req, res) =>{
  let  purchaseAmount = parseFloat(req.query. purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
  
})
 




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
