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
  errorCount: number;
  addLoader: boolean;

  constructor(private webex: WebexService) { }

  ngOnInit(): void {
    if (this.webex.webex != undefined) {
      console.log(this.webex.currentRoom);
      this.selectedRooms.push(this.webex.currentRoom);
    }
    else {
      this.webex.onInit();
    }
    this.listRooms();
  }

  listRooms() {
    this.webex.onListRoom().then((rooms) => {
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
    console.log("emails:" + JSON.stringify(this.addEmails));
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
    if (validResults.length === totalOperationsCount) {
      this.dialogMessage = "Members added successfully to the selected room(s)";
    }
    else {
      let errors: string[] = []
      invalidResults.forEach((invalidResult) => {
        errors.push(invalidResult + '<br>');
      })
      if (invalidResults.length === totalOperationsCount) {
        this.dialogMessage = "Unable to add the members. Reasons for failure: <br>" + errors;
      }
      if (invalidResults.length < totalOperationsCount) {
        this.dialogMessage = "Few of the members were not able to be added to the requested room(s).<br> The following actions failed: <br>" + errors;
      }
    }
  }

  okDialogAction() {
    this.addLoader = false;
    this.showAlertMessage = false;
  }

  onChange(e) {
    console.info(e.value);
  }
}
