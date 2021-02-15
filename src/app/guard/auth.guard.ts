import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { WebexService } from '../services/webex.service';
@Injectable({ providedIn: 'root' })
export class MyGuard implements CanActivate {
    constructor(private router: Router, private webex: WebexService) {

    }
    canActivate() {
        if (localStorage.getItem('webex_token') || sessionStorage.getItem('oauth2-csrf-token')) {
            return true;
        }
        else {
            this.router.navigate(['']);
            return false;
        }
    }
}
