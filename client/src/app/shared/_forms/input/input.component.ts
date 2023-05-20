import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control?: FormControl;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() model?: string;
  @Input() disabled = false;
  @Input() required = true;
  @Input() classList: string[] = [];
  @ViewChild('inputEl') input?: ElementRef;
  visible = false;

  getErrorMessage() {
    if (!this.control || !this.control?.touched) return;
    if (this.control.errors?.required)
      return 'Дане поле має бути заповнене';
    else if (this.control.errors?.minlength)
      return `${this.label} має бути мінімум ${this.control.errors?.minlength['requiredLength']} символів у довжину`;
    else if (this.control.errors?.maxlength)
      return `${this.label} має бути максимум ${this.control.errors?.maxlength['requiredLength']} символів у довжину`;
    else if (this.control.errors?.message)
      return this.control.errors?.message;
    else if (this.control.errors?.pattern && this.type !== 'password')
      return 'Формат введених даних є неправильним';
    else if (this.control.errors?.pattern && this.type === 'password')
      return 'Слабкий пароль';
    // else return 'Дане поле не проходить валідацію';
    else return '';
  }

  toggleVisibility($event: any) {
    this.visible = !this.visible;
    const native = this.input?.nativeElement as HTMLInputElement;
    native.type = native.type == 'text' ? 'password' : 'text';
  }
}
