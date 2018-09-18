const Calculator = require('./calculator');
const ResponseUtil = require('./ResponseUtil');

const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use((req, res, next)=>{
  if(req.method !== 'POST') {
    ResponseUtil.sendError(res, 405, 'Invalid method :(');
    return;
  }

  // Head over to validate
  next();
});

app.use((req, res, next)=>{

  if(!req.body.hasOwnProperty('expenseTripRecord')) {
    ResponseUtil.sendError(res, 400, 'Malformed body');
    return;
  }

  // validate full body
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

  // Head over to validate
  next();
})

app.post('/', (req, res) => {
  let calculator = new Calculator(req.body.expenseTripRecord);
  calculator.calculatePartialTotals()
    .calculateGrandTotal()
    .calculateEqualShares()
    .calculateOweAmount();

  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(req.body));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))