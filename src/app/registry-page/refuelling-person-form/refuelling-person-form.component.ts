import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefuellingModel } from 'src/app/core/model/refuelling-model';
import { FormGroup, FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'refuelling-person-form',
  templateUrl: './refuelling-person-form.component.html',
  styleUrls: ['./refuelling-person-form.component.css']
})
export class RefuellingPersonFormComponent implements OnInit {

  _refuellingPerson: RefuellingModel.RefuellingPerson;
  @Input("refuellingPerson") set refuellingPersonInput(val){
    this._refuellingPerson = val;
    this.setRefuellingForm( this._refuellingPerson );
  }

  @Output("submitForm") submitForm: EventEmitter<RefuellingModel.RefuellingPerson> = new EventEmitter();

  refuellingPersonForm:FormGroup;

  constructor(public formBuilder:FormBuilder) { }

  setRefuellingForm(refuellingPerson: RefuellingModel.RefuellingPerson){
    this.refuellingPersonForm = this.formBuilder.group(
      {
        name: new FormControl(refuellingPerson.name, [Validators.required]),
        surname: new FormControl(refuellingPerson.surname, [Validators.required]),
        postCode: new FormControl(refuellingPerson.postCode, []),
        city: new FormControl(refuellingPerson.city, []),
        address: new FormControl(refuellingPerson.address, []),
      }
    )
  }

  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.refuellingPersonForm.controls[controlName].hasError(errorName);
  }

  submit(){
    let val:RefuellingModel.RefuellingPerson;
    val = this.refuellingPersonForm.getRawValue();
    this.submitForm.emit( val );
  }



}
