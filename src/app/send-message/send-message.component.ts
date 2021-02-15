import { Component, OnInit } from '@angular/core';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  rooms: any;
  selectedRooms: any[] = [];
  showAlertMessage: boolean;
  dialogMessage: string;
  message: string;
  addLoader: boolean;
  maxSelectedRooms: number = 5;
  roomInfo = { title: '', id: '', created: '', lastActivity: '' };
  selectedRoomsClone: any[] = [];

  constructor(private webex: WebexService) { }

  ngOnInit(): void {
    if (this.webex.webex != undefined) {
      if (this.webex.currentRoom !== undefined) {
        console.log(this.webex.currentRoom);
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
    this.webex.onListRoom().then((rooms) => {
      this.rooms = rooms.items.filter(room => room.type == 'group');
    })
  }

  async sendMessageToSelectedRooms() {
    this.addLoader = true;
    let roomIds = [];
    this.selectedRooms.forEach((room) => {
      roomIds.push({ roomId: room.id, roomTitle: room.title });
    });

    let promises: any[] = [];
    roomIds.forEach((room) => {
      const promise =
        this.webex.onSendMessage(this.message, room.roomId, room.roomTitle)
      promises.push(promise);
    })
    const results = await Promise.all(promises.map(p => p.catch(e => e)));
    const validResults = results.filter(result => !(result instanceof Error));
    const invalidResults = results.filter(result => (result instanceof Error));
    this.showAlertMessage = true;
    if (validResults.length === roomIds.length) {
      this.dialogMessage = "Message sent successfully to the selected room(s)";
    }
    else {
      let errors: string[] = []
      invalidResults.forEach((invalidResult) => {
        errors.push(invalidResult + '<br>');
      })
      if (invalidResults.length === roomIds.length) {
        this.dialogMessage = "Unable to send message to the selected room(s): <br>" + errors;
      }
      if (invalidResults.length < roomIds.length) {
        this.dialogMessage = "Unable to send message to few of the requested room(s).<br> The following actions failed: <br>" + errors;
      }
    }
  }

  okDialogAction() {
    this.addLoader = false;
    this.showAlertMessage = false;
  }

  onChange(e) {
    if (this.selectedRooms.length) {
      this.selectedRoomsClone = JSON.parse(JSON.stringify(this.selectedRooms));
      this.roomInfo = this.selectedRoomsClone.pop();
    }
  }
}
