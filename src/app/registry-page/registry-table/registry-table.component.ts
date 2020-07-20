import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefuellingModel } from 'src/app/core/model/refuelling-model';


@Component({
  selector: 'registry-table',
  templateUrl: './registry-table.component.html',
  styleUrls: ['./registry-table.component.css']
})
export class RegistryTableComponent implements OnInit {

  displayedColumns: String[] = ['refuelingDateTime', 'price', 'amount', 'fuelType', 'odometerReading', 'updateRow', 'deleteRow'];
  _refuellings: RefuellingModel.Refuelling[] = [];
  @Input("refuellings") set refuellingsInput(val){
    this._refuellings = val;
  }
  _refuellingsRegistryTableOperationInProgres:boolean;
  @Input("refuellingsRegistryTableOperationInProgres")set refuellingsRegistryTableOperationInProgresInput(val){
    this._refuellingsRegistryTableOperationInProgres = val;
  }

  @Output("deleteRow") deleteRowEM: EventEmitter<RefuellingModel.Refuelling> = new EventEmitter();
  @Output("updateRow") updateRowEM: EventEmitter<RefuellingModel.Refuelling> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteItem(item: RefuellingModel.Refuelling){
    this.deleteRowEM.emit( item );
  }

  updateItem(item: RefuellingModel.Refuelling){
    this.updateRowEM.emit( item );
  }


}
