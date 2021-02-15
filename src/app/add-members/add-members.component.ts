import { Component, OnInit } from '@angular/core';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})

export class AddMembersComponent implements OnInit {

  rooms: any;
  selectedRooms: any[] = [];
  emails: any[] = [];
  emailId: string;
  email: string;
  addEmails: any[] = [];
  firstEmailAdd: boolean;
  showAlertMessage: boolean;
  dialogMessage: string;
  showOk: boolean;
  errorCount: number;
  addLoader: boolean;
  dialogMessageLoader: boolean;
  maxSelectedRooms: number = 5;
  roomInfo = { title: '', id: '', created: '', lastActivity: '' };
  selectedRoomsClone: any[] = [];

  constructor(private webex: WebexService) { }

  ngOnInit(): void {
    if (this.webex.webex !== undefined) {
      if (this.webex.currentRoom !== undefined) {
        console.log("created room:" + this.webex.currentRoom);
        this.selectedRooms.push(this.webex.currentRoom);
        this.selectedRoomsClone = JSON.parse(JSON.stringify(this.selectedRooms));
        this.roomInfo = this.selectedRoomsClone.pop();
      }
    }
    else {
      this.webex.onInit();
    }
    this.listRooms();
  }

  listRooms() {
    this.showAlertMessage = true;
    this.dialogMessageLoader = true;
    this.dialogMessage = 'Loading rooms... please wait!'
    this.webex.onListRoom().then((rooms) => {
      this.showAlertMessage = false;
      this.dialogMessageLoader = false;
      console.log(JSON.stringify(rooms.items))
      this.rooms = rooms.items.filter(room => room.type == 'group');
    })
  }

  addMore() {
    this.emails.push({ email: '' });
  }

  removeEmail(i: number) {
    this.emails.splice(i, 1);

  }

  removeAll() {
    this.emails = [];
  }
  async addMembersToSelectedRooms() {
    this.addLoader = true;
    //deep clone
    this.addEmails = JSON.parse(JSON.stringify(this.emails));
    this.addEmails.push({ email: this.emailId });
    let addMemberEmails = []
    this.addEmails.forEach((email) => {
      addMemberEmails.push(email.email);
    });

    let roomIds = [];
    this.selectedRooms.forEach((room) => {
      roomIds.push({ roomId: room.id, roomTitle: room.title });
    });

    let promises: any[] = [];
    const totalOperationsCount = roomIds.length * addMemberEmails.length;
    roomIds.forEach((room) => {
      const promises1 = addMemberEmails.map(email =>
        this.webex.addMembers(email, room.roomId, room.roomTitle)
      );
      promises1.forEach((promise) => {
        promises.push(promise);
      })
    })

    const results = await Promise.all(promises.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));
    const invalidResults = results.filter(result => (result instanceof Error));
    this.showAlertMessage = true;
    this.showOk = true;
    if (validResults.length === totalOperationsCount) {
      this.dialogMessage = "Members added successfully to the selected room(s)";
    }
    else {
      let errors: string[] = []
      invalidResults.forEach((invalidResult) => {
        errors.push(invalidResult + '<br>');
      })
      if (invalidResults.length === totalOperationsCount) {
        this.dialogMessage = "Unable to add the member(s). Reasons for failure: <br>" + errors;
      }
      if (invalidResults.length < totalOperationsCount) {
        this.dialogMessage = "Few of the members were not able to be added to the requested room(s).<br> The following actions failed: <br>" + errors;
      }
    }
  }

  okDialogAction() {
    this.addLoader = false;
    this.showAlertMessage = false;
    this.showOk = false;
  }

  onChange(e) {
    if (this.selectedRooms.length) {
      this.selectedRoomsClone = JSON.parse(JSON.stringify(this.selectedRooms));
      this.roomInfo = this.selectedRoomsClone.pop();
    }
  }
}
