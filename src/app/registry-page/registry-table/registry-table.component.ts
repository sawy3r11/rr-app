import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefuellingModel } from 'src/app/core/model/refuelling-model';

export interface RefuellingStat{
  totalCost: number, 
  totalAmount:number
}
@Component({
  selector: 'registry-table',
  templateUrl: './registry-table.component.html',
  styleUrls: ['./registry-table.component.css']
})
export class RegistryTableComponent implements OnInit {
  refuellingStat: RefuellingStat = {totalAmount: 0, totalCost:0};
  displayedColumns: String[] = ['refuelingDateTime', 'price', 'amount', 'cost', 'fuelType', 'odometerReading', 'refuellingPerson', 'updateRow', 'deleteRow'];
  _refuellings: RefuellingModel.Refuelling[] = [];
  @Input("refuellings") set refuellingsInput(val){
    this._refuellings = val;
    this.refuellingStat = this.countStat( val );
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

  countStat(refuellings: RefuellingModel.Refuelling[]):RefuellingStat{
    let stat:RefuellingStat = {totalAmount:0, totalCost:0};
    if( refuellings!=null ){
      refuellings.forEach(x=>{
        stat.totalAmount+=x.amount;
        stat.totalCost+=x.cost;
      })
    }


    return stat;
  }


}
