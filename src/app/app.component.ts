import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { WebexService } from './services/webex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-webex';
  // session idle check
  constructor(private bnIdle: BnNgIdleService, private route: Router, private webex: WebexService) {
    this.bnIdle.startWatching(environment.TIMEOUT).subscribe((res) => {
      window.alert('Session timed out after being kept idle for long. Please login again');
      this.webex.onLogout();
    });
  }
}
