import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() disabled = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() type = 'button';
  @Input() classList: string[] = [];
  @Input() colors: string[] = ['bg-[#5FCFF7]', 'text-white'];

  click() {
    this.onClick.emit();
  }
}
