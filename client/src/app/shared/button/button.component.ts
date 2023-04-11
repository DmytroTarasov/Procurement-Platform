import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import { selectLoading } from 'src/app/store/selectors/spinner.selectors';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  // @Input() variant: 'outlined' | 'standard' = 'standard';
  @Input() text: string;
  @Input() disabled = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() type = 'button';
  @Input() classList: string[] = [];
  @Input() colors: string[] = ['bg-[#5FCFF7]', 'text-white'];
  @Input() showSpinner = false;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectLoading));
  }

  click() {
    this.onClick.emit();
  }

  // getClasses() {
  //   switch(this.variant) {
  //     case 'standard':
  //       return ['']
  //   }
  // }
}
