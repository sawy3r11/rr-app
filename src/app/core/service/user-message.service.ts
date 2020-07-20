import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent, MessageData } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService {

  constructor(public dialog: MatDialog) { }


  public openUserMessageDialog(messageData: MessageData){
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: messageData
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public showUnknownErrorDialog(){
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: {
        title:'Error', 
        message: 'Unknown error occurred!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
