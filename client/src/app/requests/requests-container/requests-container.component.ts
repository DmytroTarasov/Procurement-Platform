import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as DialogActions from 'src/app/store/actions/dialog.actions';

@Component({
  selector: 'app-requests-container',
  templateUrl: './requests-container.component.html',
  styleUrls: ['./requests-container.component.scss']
})
export class RequestsContainerComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  openCreateRequestDialog() {
    this.store.dispatch(DialogActions.openCreateRequestDialog());
  }
  
}
