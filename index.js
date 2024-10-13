const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

app.get("/cart-total",(req, res) => {
let newItemPrice = parseFloat(req.query.newItemPrice);
let cartTotal = parseFloat(req.query.cartTotal);
let totalCartValue = newItemPrice + cartTotal ;
res.send(totalCartValue.toString());
})

app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  let discountPercentage = 10;
  let result ;
  if(isMember) {
    result =  cartTotal - cartTotal * (discountPercentage / 100);
  } else {
    result =  cartTotal;
  }
  res.send(result.toString());
})

app.get("/calculate-tax", (req, res) => {
 let cartTotal = parseFloat(req.query.cartTotal);
let taxRate = 5;
let result = cartTotal * (taxRate / 100);
res.send(result.toString());
})

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod === "express";
  let distance = parseFloat(req.query.distance);
  let result;
  if (shippingMethod) 
{result =  distance / 100
   }
   else 
 ( result =  distance / 50)
  res.send(result.toString());
  });

app.get("/shipping-cost", (req, res) => {
let weight = parseFloat(req.query.weight);
let distance = parseFloat(req.query.distance);
 let shippingCost = weight * distance * 0.1;
 res.send(shippingCost.toString());
})
  
app.get("/loyalty-points", (req, res) => {
let purchaseAmount = parseFloat(req.query.purchaseAmount);
let loyaltyRate = 2;
let loyaltyPoints = purchaseAmount * ((loyaltyRate * 100) / 100 );
res.send(loyaltyPoints.toString());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});