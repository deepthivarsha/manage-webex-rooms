import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import WebexSDK from 'webex';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebexService {
  webex: any
  currentRoom: any;
  roomId: any;

  onBeforeLogin() {
    this.webex = WebexSDK.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          scope: environment.scope
        }
      }
    })
    this.listenForWebex()
    this.webex.authorization.initiateLogin()
  }

  onInit() {
    this.webex = WebexSDK.init({
        config: {
          meetings: {
            deviceType: 'WEB'
          }
        },
        credentials: {
          access_token: localStorage.getItem('webex_token')
        }
    })
    this.listenForWebex()
  }

  async onCreateRoom(name: string): Promise<void>{
    return new Promise(async (resolve, reject) => {
    try {
      this.currentRoom = await this.webex.rooms.create({ title: name })
      this.roomId = this.currentRoom.id;
      resolve();
    } catch(error) {
      reject(error);
    }
});
  }

  async onSendMessage(text: string, roomId:string, roomTitle:string): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
    await this.webex.messages.create({
        text: text,
        roomId: roomId
      });
      resolve("message sent to the room "+roomTitle);
    } catch(error) {
      reject(new Error("Unable to send message to the room "+roomTitle));
    }
  })
}

  async addMembers(email:string,roomId:string,roomTitle:string): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
     await this.webex.memberships.create({
        personEmail: email,
        roomId: roomId
      });
      resolve(email+" added to "+roomTitle);
    } catch(error) {
      if(error.name==="Conflict"){
      reject(new Error("User "+email+" is already a participant of the room "+roomTitle));
      }
      else if (error.name==="NotFound") {
        reject(new Error("Unable to add "+email+" to the room "+roomTitle+". Please check the email ID"));
      }
      else{
        reject(new Error("Unable to add "+email+" to the room "+roomTitle));
      }
    }
    });
  }

  async onListRoom() {
    return this.webex.rooms.list()
  }

  async listPeople() {
      return this.webex.people.list()
  }

  async getMyOwnDetails() {
    return this.webex.people.get('me');
  }

  async listenForWebex() {
    this.webex.once(`ready`, () => {
      console.log("READY", this.webex.credentials.supertoken)
      if (this.webex.credentials.supertoken){
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token)
      }
    });
  }

  onLogout() {
    if(this.webex) {
      if (this.webex.canAuthorize) {
        console.log('Already Logged in')
        this.webex.logout();
      }
      else {
        this.webex.logout();
      }
      localStorage.removeItem('webex_token')
    }
  }
}