import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RefuellingModel } from '../model/refuelling-model';
import { environment } from 'src/environments/environment';
import { UserMessageService } from './user-message.service';

@Injectable({
  providedIn: 'root'
})
export class RefuellingRegistryService {

  refuellingsRegistryTableOperationInProgres:BehaviorSubject<Boolean> = new BehaviorSubject(false);
  refuellingsRegistry: BehaviorSubject<RefuellingModel.Refuelling[]> = new BehaviorSubject<RefuellingModel.Refuelling[]>([]);


  constructor(public http: HttpClient, public userMessageService:UserMessageService) { }

  public getRefuellingRegisrty(){
    this.refuellingsRegistryTableOperationInProgres.next( true );
    this.getRefuellingRegistryAPI()
      .subscribe((refuellingRegisrty: RefuellingModel.RefuellingResDTO[])=>{
        this.refuellingsRegistry.next( refuellingRegisrty as RefuellingModel.Refuelling[] );
        this.refuellingsRegistryTableOperationInProgres.next(false);
      },
      (error: HttpErrorResponse)=>{
        this.userMessageService.showUnknownErrorDialog();
        this.refuellingsRegistryTableOperationInProgres.next(false);
      });
  }

  public addRefuellingRegistry(refuelling: RefuellingModel.Refuelling){
    this.refuellingsRegistryTableOperationInProgres.next( true );
    let refuellingReq = refuelling;
    this.addRefuellingRegistryAPI(refuellingReq)
      .subscribe((val: RefuellingModel.RefuellingResDTO)=>{
        let addedItem: RefuellingModel.Refuelling = val as RefuellingModel.Refuelling;
        let refuellings = this.refuellingsRegistry.value;
        refuellings = [...refuellings, addedItem];
        this.refuellingsRegistry.next( refuellings );
        this.refuellingsRegistryTableOperationInProgres.next(false);
      },
      (error: HttpErrorResponse)=>{
        this.userMessageService.showUnknownErrorDialog();
        this.refuellingsRegistryTableOperationInProgres.next(false);
      });
  }

  public deleteRefuelling(refuelling: RefuellingModel.Refuelling){
    this.refuellingsRegistryTableOperationInProgres.next( true );
    this.deleteRefuellingRegistryAPI(refuelling.id)
      .subscribe(()=>{
        this.deleteRefuelingFromVariable( refuelling.id );
        this.refuellingsRegistryTableOperationInProgres.next(false);
      },
      (error: HttpErrorResponse)=>{
        this.userMessageService.showUnknownErrorDialog();
        this.refuellingsRegistryTableOperationInProgres.next(false);
      })
  }

  public updateRefuelling(refuelling: RefuellingModel.Refuelling){
    this.refuellingsRegistryTableOperationInProgres.next( true );
    this.updateRefuellingRegistryAPI(refuelling.id, refuelling)
      .subscribe((res:RefuellingModel.RefuellingResDTO)=>{
        let items = this.refuellingsRegistry.value;
        let index = items.findIndex(x=>x.id == refuelling.id);
        items[index] = res as RefuellingModel.Refuelling;
        this.refuellingsRegistry.next( [...items] );
        this.refuellingsRegistryTableOperationInProgres.next(false);
      },
      (error: HttpErrorResponse)=>{
        if(error.status == 404){
          this.deleteRefuelingFromVariable( refuelling.id );
          this.userMessageService.openUserMessageDialog({
            title: 'Error',
            message: 'Selected refuelling not exist!'
          })
        }else{
          this.userMessageService.showUnknownErrorDialog();
        }
        this.refuellingsRegistryTableOperationInProgres.next(false);
      })
      
  }

  private deleteRefuelingFromVariable(id: number){
    let items = this.refuellingsRegistry.value;
    items = items.filter(x=>x.id != id);
    this.refuellingsRegistry.next( [...items] );
  }

  /*---------------API--------------------------*/
  public getRefuellingRegistryAPI(){
    const api = environment.apiUrl + "/refuelling";
    return this.http.get<RefuellingModel.RefuellingResDTO[]>(api);
  }

  public addRefuellingRegistryAPI(refuellingReq: RefuellingModel.RefuellingReqDTO){
    const api = environment.apiUrl + "/refuelling";
    return this.http.post<RefuellingModel.RefuellingResDTO>(api, refuellingReq)
  }

  public updateRefuellingRegistryAPI(id: number, refuellingReq: RefuellingModel.RefuellingReqDTO){
    const api = environment.apiUrl + "/refuelling/" + id;
    return this.http.put<RefuellingModel.RefuellingResDTO>(api, refuellingReq);
  }

  public deleteRefuellingRegistryAPI(refuellingId: number){
    const api = environment.apiUrl + "/refuelling/"+refuellingId;
    return this.http.delete(api);
  }
  /*------------------//API-----------------*/
}
