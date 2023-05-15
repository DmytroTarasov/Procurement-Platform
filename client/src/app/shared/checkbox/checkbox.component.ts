import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() label: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  change(event: any) {
    this.onChange.emit(event.target.checked);
  }
}
