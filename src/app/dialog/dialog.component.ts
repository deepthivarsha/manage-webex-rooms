import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() modalMessage;
  @Input() modalTitle;
  @Input() showOk;
  @Input() showCancel;
  @Input() showDialogSpinner;
  @Output() okDialogEvent = new EventEmitter<boolean>();
  @Output() cancelDialogEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  okModal() {
    this.okDialogEvent.emit();
  }

  cancelModal() {
    this.cancelDialogEvent.emit();
  }
}
