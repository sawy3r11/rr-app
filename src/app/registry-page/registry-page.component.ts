import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { RefuellingDialogComponent } from './refuelling-dialog/refuelling-dialog.component';
import { RefuellingRegistryService } from '../core/service/refuelling-registry.service';
import { OperationType } from '../core/model/OperationType.model';
import { BehaviorSubject } from 'rxjs';
import { RefuellingPersonService } from '../core/service/refuelling-person.service';

@Component({
  selector: 'app-registry-page',
  templateUrl: './registry-page.component.html',
  styleUrls: ['./registry-page.component.css']
})
export class RegistryPageComponent implements OnInit {

  constructor(public refuellingRegistryService: RefuellingRegistryService, 
    public refuellingPersonService:RefuellingPersonService,
    public dialog: MatDialog) { }

  refuellingsRegistryTableOperationInProgres_0: BehaviorSubject<Boolean>;
  refuellings_0 = this.refuellingRegistryService.refuellingsRegistry;

  ngOnInit() {
    this.refuellingRegistryService.getRefuellingRegisrty();
    this.refuellingPersonService.getRefuellingPeople();
    this.refuellingsRegistryTableOperationInProgres_0 = this.refuellingRegistryService.refuellingsRegistryTableOperationInProgres;
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(RefuellingDialogComponent, {
      width: '800px',
      data: {operationType: OperationType.ADD, 
        refuelling: {id: 0,
        refuelingDateTime: null ,
        price: 0.01,
        amount: 0.01,
        odometerReading: 1,
        fuelType: null }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result!=null ){
        this.refuellingRegistryService.addRefuellingRegistry( result );
      }
      
    });
  }

  deleteRefuelling(val){
    this.refuellingRegistryService.deleteRefuelling( val );
  }

  updateRefuelling(val){
    const dialogRef = this.dialog.open(RefuellingDialogComponent, {
      width: '800px',
      data: {
              operationType: OperationType.UPDATE, 
              refuelling: val
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result!=null ){
        this.refuellingRegistryService.updateRefuelling( result );
      }
      
    });
  }

}
