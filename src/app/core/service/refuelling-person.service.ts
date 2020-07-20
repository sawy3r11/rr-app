import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RefuellingModel } from '../model/refuelling-model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserMessageService } from './user-message.service';

@Injectable({
  providedIn: 'root'
})
export class RefuellingPersonService {

  public refuellingPeople_0: BehaviorSubject<RefuellingModel.RefuellingPerson[]> = new BehaviorSubject(null);
  public refuellingPersonSelected_0: Subject<RefuellingModel.RefuellingPerson> = new Subject();

  constructor(public http:HttpClient, public userMessageService: UserMessageService) { }


  public getRefuellingPeople(){
    this.getRefullingPeopleAPI()
      .subscribe((val:RefuellingModel.RefuellingPersonResDTO []) =>{
        let emptyItem: RefuellingModel.RefuellingPerson = {id:null, name:"-", surname:"", postCode: "", city:"", address:""};
        val.unshift(emptyItem);
        this.refuellingPeople_0.next( val );
      },
      (error: HttpErrorResponse)=>{
        this.userMessageService.showUnknownErrorDialog();
      });
  }

  public addRefuellingPerson(refuellingPerson:RefuellingModel.RefuellingPerson){
    this.addRefullingPeopleAPI(refuellingPerson)
      .subscribe((val:RefuellingModel.RefuellingPersonResDTO)=>{
        let array = this.refuellingPeople_0.value;
        array.push(val);
        this.refuellingPeople_0.next( array );
        this.refuellingPersonSelected_0.next( val );
      },
      (error: HttpErrorResponse)=>{
        this.userMessageService.showUnknownErrorDialog();
      })
  }

  /*----------------API-------------------*/
  public getRefullingPeopleAPI(){
    const api = environment.apiUrl + '/refuellingPerson';
    return this.http.get<RefuellingModel.RefuellingPersonResDTO[]>(api);
  }
  public addRefullingPeopleAPI(refuellingPerson:RefuellingModel.RefuellingPerson){
    const api = environment.apiUrl + '/refuellingPerson';
    return this.http.post<RefuellingModel.RefuellingPersonResDTO>(api, refuellingPerson);
  }
  /*--------------//API-------------------*/
}
