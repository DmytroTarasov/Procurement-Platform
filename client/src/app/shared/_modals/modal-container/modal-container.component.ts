import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as DialogActions from 'src/app/store/actions/dialog.actions';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent {
  @Input() size = ['w-[300px]', 'h-auto'];
  @Input() showClose = true;
  @Input() title?: string;

  constructor(private store: Store<fromApp.AppState>) { }

  close() {
    this.store.dispatch(DialogActions.closeDialogs());
  }
}
