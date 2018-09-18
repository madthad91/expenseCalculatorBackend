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

  calculateGrandTotal() {
    this._grandTotal = 0;
    this.expenseTripRecord
      .forEach(val=>{
        this._grandTotal += val["total"];
      });
    return this;
  }

  calculateEqualShares(){
    this._equalShareAmount = this._grandTotal/this.expenseTripRecord.length;
    return this;
  }

  calculateOweAmount() {
    this.expenseTripRecord
      .forEach((val, idx)=>{
        if(idx !== this.greatestTotalIdx) {
          this.expenseTripRecord[idx]['owes'] = this.roundTotal(this._equalShareAmount - val.total, 2)
        }
      })
  }


  roundTotal(value, digits) {
    return Number(Math.round(value+`e${digits}`)+`e-${digits}`);
  }

}