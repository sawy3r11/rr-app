import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OperationType } from 'src/app/core/model/OperationType.model';
import { RefuellingModel } from 'src/app/core/model/refuelling-model';
import { FuelType } from 'src/app/core/model/FuelType.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { format } from 'url';
import { from } from 'rxjs';


export interface RefuellingDialogInput{
  operationType: OperationType,
  refuelling: any
}

@Component({
  selector: 'app-refuelling-dialog',
  templateUrl: './refuelling-dialog.component.html',
  styleUrls: ['./refuelling-dialog.component.css']
})
export class RefuellingDialogComponent implements OnInit {

  fuelTypes: FuelType[] = [FuelType.LPG, FuelType.ON, FuelType.PB_95, FuelType.PB_98];
  operationType: OperationType;
  refuelling: RefuellingModel.Refuelling; 

  public refuellingForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<RefuellingDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: RefuellingDialogInput){
      this.refuelling = data.refuelling;
      this.operationType = data.operationType;
      this.setRefuellingForm( this.refuelling );
    }
  
  ngOnInit() {

  }

  setRefuellingForm(refuelling: RefuellingModel.Refuelling){
    this.refuellingForm = new FormGroup({
      refuelingDateTime: new FormControl(refuelling.refuelingDateTime, [Validators.required]),
      price: new FormControl(refuelling.price, [Validators.required, Validators.min(0.001)]),
      amount: new FormControl(refuelling.amount, [Validators.required, Validators.min(0.001)]),
      odometerReading: new FormControl(refuelling.odometerReading, [Validators.required, Validators.min(0.001)]),
      fuelType: new FormControl(refuelling.fuelType, [Validators.required])
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.refuellingForm.controls[controlName].hasError(errorName);
  }

  onNoClick(){
    this.dialogRef.close();
  }

  submitRefuellingFrom(val){
    console.log("1233")
    if( this.operationType==OperationType.ADD ){
      let refuelling = this.getRefuellingFromForm( 0, val );
      this.dialogRef.close( refuelling );
    }else if( this.operationType==OperationType.UPDATE ){
      let refuelling = this.getRefuellingFromForm( this.refuelling.id, val );
      this.dialogRef.close( refuelling );
    }
    
  }

  submitAdd(){
    let refuelling = this.getRefuellingFromForm( 0, this.refuellingForm );
    this.dialogRef.close( refuelling );
  }

  submitUpdate(){
    let refuelling = this.getRefuellingFromForm( this.refuelling.id , this.refuellingForm );
    this.dialogRef.close( refuelling );
  }

  private getRefuellingFromForm(id:number, form){
    let refuelling : RefuellingModel.Refuelling = {
      id: id,
      refuelingDateTime: form.refuelingDateTime,
      amount: form.amount,
      fuelType: form.fuelType, 
      odometerReading: form.odometerReading,
      price: form.price
    }
    return refuelling;
  }



}
