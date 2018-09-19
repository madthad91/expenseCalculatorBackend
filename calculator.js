// Calculator class - has all procedures to calculate reimbursement amounts, 
// and how much each student owes the other
module.exports = class Calculator{
  /* Was going to lift variables prefixed with _'s to somewhere outside of this class
   * to avoid it being public, but wasn't sure on your patterns.
   * TODO: Check Itrellis best practices doc for recommended approaches,
   * or make one
   */

  constructor(expenseTripRecord){
    this.expenseTripRecord = expenseTripRecord;
    this.greatestTotalAmount = 0;
  }

  // Function calculatePartialTotals
  // Calculates the total spent per student
  // It also keeps track of the biggest spender as that is 
  // the person who everyone else owes
  calculatePartialTotals() {
    this.expenseTripRecord.
      forEach((val, idx)=>{
        const partialTotal = val.expenses.reduce((accum, val)=>accum + val);
        // Saving greatest sum
        if(this.greatestTotalAmount < partialTotal) {
          this.greatestTotalAmount = partialTotal;
          this.greatestTotalIdx = idx;
        }
        this.expenseTripRecord[idx]['total'] = partialTotal;
      });

    return this;
  }

  // Function calculateGrandTotal
  // Calculates the total spent per student
  calculateGrandTotal() {
    this._grandTotal = 0;
    this.expenseTripRecord
      .forEach(val=>{
        this._grandTotal += val["total"];
      });
    return this;
  }

  // Function calculateEqualShares
  // Calculates reimbursement
  calculateEqualShares(){
    this._equalShareAmount = this._grandTotal/this.expenseTripRecord.length;
    return this;
  }

  // Function calculateOweAmount
  // Calculates the amount that each person that owes anything owes
  // This using a bit more of an absolute version of toFixed as toFixed can 
  // have issues when using in conjunction with floats
  calculateOweAmount() {
    this.expenseTripRecord
      .forEach((val, idx)=>{
        if(idx !== this.greatestTotalIdx) {
          this.expenseTripRecord[idx]['owes'] = this.roundTotal(this._equalShareAmount - val.total, 2)
        }
      })
  }

  // Function - roundTotal
  // Custom Implementation of toFixed
  roundTotal(value, digits) {
    return Number(Math.round(value+`e${digits}`)+`e-${digits}`);
  }

}