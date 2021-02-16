import { Component, OnInit } from '@angular/core';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showSidebar: boolean;
  showAlertMessage:boolean;
  dialogMessage:string;
  loggedInUser;
  userName:string;
  constructor(private webex: WebexService) {
    var myContextWithPath = window.location.pathname;
    if (myContextWithPath === '/' || myContextWithPath === '') {
      this.showSidebar = false;
    }
    else if (localStorage.getItem('webex_token') || sessionStorage.getItem('oauth2-csrf-token')) {
      this.showSidebar = true;
    }
    else {
      this.showSidebar = false;
    }
  }

  ngOnInit(): void {
    if (this.webex.webex === undefined) {
      this.webex.onInit();
    }
    this.webex.getMyOwnDetails().then((data)=>{
      this.userName = data.displayName;
    })
  }

  logout() {
    this.showAlertMessage = true;
    this.dialogMessage = "Are you sure you want to logout? Press Cancel if you do not want to logout"
  }

  okDialogAction() {
    this.showAlertMessage = false;
    this.webex.onLogout();
  }

  cancelDialogAction() {
    this.showAlertMessage = false;
  }
}
