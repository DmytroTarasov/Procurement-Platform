import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() label: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  change(event: any) {
    this.onChange.emit(event.target.checked);
  }

  constructor() {}

  ngOnInit() {}
}
