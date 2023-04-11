import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalRedirectButton {
  text: string;
  route: string;
}

export interface ModalRedirectData {
  title?: string;
  text: string;
  width?: string;
  height?: string;
  primaryBtn?: ModalRedirectButton;
  secondaryBtn?: ModalRedirectButton;
  successfull?: boolean;
}

@Component({
  selector: 'app-modal-redirect',
  templateUrl: './modal-redirect.component.html',
  styleUrls: ['./modal-redirect.component.scss']
})
export class ModalRedirectComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalRedirectData) { }
}
