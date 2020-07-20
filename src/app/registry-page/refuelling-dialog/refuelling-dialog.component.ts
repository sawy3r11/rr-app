import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OperationType } from 'src/app/core/model/OperationType.model';
import { RefuellingModel } from 'src/app/core/model/refuelling-model';
import { FuelType } from 'src/app/core/model/FuelType.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { format } from 'url';
import { from, BehaviorSubject, Subscribable, Subscription } from 'rxjs';
import { RefuellingPersonService } from 'src/app/core/service/refuelling-person.service';


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
  showAddNewRefuellingPersonForm: boolean = false;
  refuellingPerson: RefuellingModel.RefuellingPerson;
  newRefuellingPerson_$:Subscription;

  public refuellingForm: FormGroup;
  public selectRefuellingPersonForm: FormGroup;
  public refuellingPeople_0:BehaviorSubject<RefuellingModel.RefuellingPerson[]> = this.refuellingPersonService.refuellingPeople_0;

  constructor(public dialogRef: MatDialogRef<RefuellingDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: RefuellingDialogInput,
    public refuellingPersonService: RefuellingPersonService, 
    public formBuilder: FormBuilder){
      this.refuelling = data.refuelling;
      this.operationType = data.operationType;
      this.setRefuellingForm( this.refuelling );
      this.setSelectRefuellingPersonForm( this.refuelling.refuellingPerson==null?null:this.refuelling.refuellingPerson.id );
    }
  
  ngOnInit() {
    this.newRefuellingPerson_$ = this.refuellingPersonService.refuellingPersonSelected_0
      .subscribe((val:RefuellingModel.RefuellingPerson)=>{
        this.selectRefuellingPersonForm.controls['refuellingPersonId'].setValue(val.id);
      })
  }

  setRefuellingForm(refuelling: RefuellingModel.Refuelling){
    this.refuellingForm = this.formBuilder.group({
      refuelingDateTime: new FormControl(refuelling.refuelingDateTime, [Validators.required]),
      price: new FormControl(refuelling.price, [Validators.required, Validators.min(0.001)]),
      amount: new FormControl(refuelling.amount, [Validators.required, Validators.min(0.001)]),
      odometerReading: new FormControl(refuelling.odometerReading, [Validators.required, Validators.min(0.001)]),
      fuelType: new FormControl(refuelling.fuelType, [Validators.required])
    })
  }

  setSelectRefuellingPersonForm(refuellingPersonId: number){
    this.selectRefuellingPersonForm = new FormGroup({
      refuellingPersonId: new FormControl(refuellingPersonId, [])
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.refuellingForm.controls[controlName].hasError(errorName);
  }

  onNoClick(){
    this.dialogRef.close();
  }

  submitRefuellingFrom(){
    if( this.operationType==OperationType.ADD ){
      let refuelling = this.getRefuellingFromForms( 0, this.refuellingForm.value, this.selectRefuellingPersonForm.value );
      this.dialogRef.close( refuelling );
    }else if( this.operationType==OperationType.UPDATE ){
      let refuelling = this.getRefuellingFromForms( this.refuelling.id, this.refuellingForm.value, this.selectRefuellingPersonForm.value );
      this.dialogRef.close( refuelling );
    }
    
  }

  private getRefuellingFromForms(id:number, refuellingFormValue, refuellingPersonFormValue){
    let refuelling : RefuellingModel.Refuelling = refuellingFormValue as RefuellingModel.Refuelling;
    let refuellingPersonId = refuellingPersonFormValue.refuellingPersonId;
    refuelling.refuellingPersonId = refuellingPersonId;
    refuelling.id = id;
    return refuelling;
  }

  showAddNewRefuellingPerson(){
    this.refuellingPerson = {id: null, name:"", address:"", city:"",postCode:"",surname:""};
    this.showAddNewRefuellingPersonForm = true;
  }

  submitAddRefuellingPerson(refuellingPerson:RefuellingModel.RefuellingPerson){
    this.refuellingPersonService.addRefuellingPerson( refuellingPerson );
  }

  ngOnDestroy(){
    this.newRefuellingPerson_$.unsubscribe();
  }

}
