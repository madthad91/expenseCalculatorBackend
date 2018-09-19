const Calculator = require('../calculator');

describe('it should just work', ()=>{
  let calc;
  beforeEach(()=>{
    calc = new Calculator([{
			"fullName": "Louis",
			"expenses": [5.75, 35.00, 12.79]
		}, {
			"fullName": "Carter",
			"expenses": [12.00, 15.00, 23.23]
		}, {
			"fullName": "David",
			"expenses": [10.00, 20.00, 38.41, 45.00]
		}])
  })

  it('should calculate partial totals', ()=>{
    calc.calculatePartialTotals();
    expect(calc['expenseTripRecord'][0].total).toEqual(53.54);
  })

  it('should calculate grand total', ()=>{
    calc
      .calculatePartialTotals()
      .calculateGrandTotal();
    expect(calc._grandTotal).toEqual(217.18);
  })

  // Negative test
  it('should not calculate grand total', ()=>{
    calc.calculateGrandTotal();
    expect(calc._grandTotal).toBeNaN();
  })

  it('should calculate equal shares', ()=>{
    calc
      .calculatePartialTotals()
      .calculateGrandTotal()
      .calculateEqualShares();
    expect(calc._equalShareAmount).toEqual(72.39333333333333);
  })


  it('should calculate owe amount', ()=>{
    calc
      .calculatePartialTotals()
      .calculateGrandTotal()
      .calculateEqualShares()
      .calculateOweAmount();
    expect(calc['expenseTripRecord'][0].owes).toEqual(18.85);
    expect(calc['expenseTripRecord'][1].owes).toEqual(22.16);
  })
})

// module.exports = class Calculator{
//   /* Was going to lift variables prefixed with _'s to somewhere outside of this class
//    * to avoid it being public, but wasn't sure on your patterns.
//    * TODO: Check Itrellis best practices doc for recommended approaches,
//    * or make one
//    */

//   constructor(expenseTripRecord){
//     this.expenseTripRecord = expenseTripRecord;
//     this.greatestTotalAmount = 0;
//   }

//   calculatePartialTotals() {
//     this.expenseTripRecord.
//       forEach((val, idx)=>{
//          const partialTotal = val.expenses.reduce((accum, val)=>accum + val);
//          // Saving greatest sum
//          if(this.greatestTotalAmount < partialTotal) {
//            this.greatestTotalAmount = partialTotal;
//            this.greatestTotalIdx = idx;
//          }
//          this.expenseTripRecord[idx]['total'] = partialTotal;
//       });

//     return this;
//   }

//   calculateGrandTotal() {
//     this._grandTotal = 0;
//     this.expenseTripRecord
//       .forEach(val=>{
//         this._grandTotal += val["total"];
//       });
//     return this;
//   }

//   calculateEqualShares(){
//     this._equalShareAmount = this._grandTotal/this.expenseTripRecord.length;
//     return this;
//   }

//   calculateOweAmount() {
//     this.expenseTripRecord
//       .forEach((val, idx)=>{
//         if(idx !== this.greatestTotalIdx) {
//           this.expenseTripRecord[idx]['owes'] = this.roundTotal(this._equalShareAmount - val.total, 2)
//         }
//       })
//   }


//   roundTotal(value, digits) {
//     return Number(Math.round(value+`e${digits}`)+`e-${digits}`);
//   }

// }