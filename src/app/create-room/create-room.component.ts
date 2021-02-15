import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebexService } from '../services/webex.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateRoomComponent implements OnInit {
  roomName: string;
  message: string;
  email: string;
  rooms: any = [{ "id": "Y2lzY29zcGFyazovL3VzL1JPT00vNTZmNjU5ODctNTljMS0zZjc1LWE3NDYtNTM0Y2EzOTYyYTg2", "title": "APJC Benefits", "type": "direct", "isLocked": false, "lastActivity": "2021-02-12T13:47:14.328Z", "creatorId": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS9iOGJhNTIxYi1mZjVkLTQ5MTMtYjFkNS00OTQ1YjljZDZhZTM", "created": "2021-02-12T13:47:13.591Z", "ownerId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8xZWI2NWZkZi05NjQzLTQxN2YtOTk3NC1hZDcyY2FlMGUxMGY" }, { "id": "Y2lzY29zcGFyazovL3VzL1JPT00vOTg5NGIyMTEtNmQzOC0xMWViLThjNjQtZTczMTEzMDRjZDU2", "title": "prep-task", "type": "group", "isLocked": false, "lastActivity": "2021-02-12T14:12:59.417Z", "creatorId": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS82MDY3ZWI5OC0zYTFjLTRiMDMtOWMzMi0xNjEyZGIyNWQ4ZWI", "created": "2021-02-12T13:45:41.042Z", "ownerId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8xZWI2NWZkZi05NjQzLTQxN2YtOTk3NC1hZDcyY2FlMGUxMGY" }];
  selectedRoom: any;
  showSuccessDialog: boolean;
  showFailureDialog: boolean;
  showAlertMessage: boolean;
  isCancelEnabled: boolean;
  dialogMessage: string;
  addLoader: boolean;
  createRoom = new FormGroup({
    newRoomName: new FormControl('', [Validators.required]),
  });

  constructor(private webex: WebexService, private router: Router) { }

  ngOnInit(): void {
    this.webex.onInit();
    this.listRooms();
  }

  get newRoomNameErrors() {
    return this.createRoom.controls.newRoomName.errors || {};
  }

  onCreateRoom() {
    this.addLoader = true;
    if (this.roomName) {
      this.webex.onCreateRoom(this.roomName)
        .then(() => {
          this.addLoader = false;
          this.showAlertMessage = true;
          this.showSuccessDialog = true;
          this.isCancelEnabled = true;
          this.dialogMessage = "Room created successfully! Press OK if you would like to add members to the created room.";
        })
        .catch(error => {
          this.addLoader = false;
          this.showAlertMessage = true;
          this.showFailureDialog = true;
          this.isCancelEnabled = false;
          this.dialogMessage = "Something went wrong! Please try again later";
        })
    }
  }

  listRooms() {
    this.webex.onListRoom().then((rooms) => {
      console.log(JSON.stringify(rooms.items))
      this.rooms = rooms.items;
    })
  }

  onChange(e) {
    console.info(e.value);
  }

  onFilterChange(e) {
    console.info('emitted filter value: ', e);
  }

  onLogout() {
    this.webex.onLogout()
  }

  okDialogAction() {
    this.showAlertMessage = false;
    if (this.showSuccessDialog) {
      this.router.navigateByUrl('/addmembers');
    }
    this.showSuccessDialog = false;
    this.showFailureDialog = false;
    this.isCancelEnabled = false;
  }

  cancelDialogAction() {
    this.showAlertMessage = false;
    this.showSuccessDialog = false;
    this.showFailureDialog = false;
    this.isCancelEnabled = false;
  }
}
