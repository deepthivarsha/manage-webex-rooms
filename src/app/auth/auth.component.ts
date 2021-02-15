import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebexService } from '../services/webex.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private webex: WebexService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.webex.onBeforeLogin()
  }

  ngOnDestroy() {

  }
}
