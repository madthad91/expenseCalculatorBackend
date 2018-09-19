const Calculator = require('./calculator');
const ResponseUtil = require('./ResponseUtil');

const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');

// allowing all origins for sake of demo
app.use(cors());

// adding body parser
app.use(bodyParser.json());

// Validation 1: is it a post request at all
app.use((req, res, next)=>{
  if(req.method !== 'POST') {
    ResponseUtil.sendError(res, 405, 'Invalid method :(');
    return;
  }

  // Head over to validate
  next();
});

// Validation 2: does it always have the key expenseTripRecord and in it is there
// a full name and an array of expenses
app.use((req, res, next)=>{

  if(!req.body.hasOwnProperty('expenseTripRecord')) {
    ResponseUtil.sendError(res, 400, 'Malformed body');
    return;
  }


  if(req.body.expenseTripRecord
    .some(val=>{
      if(!(val.hasOwnProperty('fullName') && val.hasOwnProperty('expenses'))) {
        return true;
      } else if(!(typeof val.fullName === 'string' && 
        Array.isArray(val.expenses) && 
        !val.expenses.some(isNaN))){
        return true;
      }
    })) {
      ResponseUtil.sendError(res, 400, 'Malformed body');
      return;
    }
  // End validate full body

  // Head over run the calculator
  next();
})

// Runner
app.post('/', (req, res) => {
  let calculator = new Calculator(req.body.expenseTripRecord);

  // Procedural, so using method chaining
  calculator.calculatePartialTotals()
    .calculateGrandTotal()
    .calculateEqualShares()
    .calculateOweAmount();

  // Send response
  ResponseUtil.sendSuccess(req,res);
});

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))