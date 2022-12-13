import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() public type: 'text' | 'password' | 'number' = 'text';

  @Input() set inputValue(value: string) {
    this.value = value;
  };

  @Input() public placeholder!: string;
  @Input() public label!: string;
  @Input() public icon?: string;
  @Input() public readonly = false;
  @Input() public error?: string;
  @Input() public hasError?: boolean;

  public isHide: boolean = true;

  public onChange(value: string): void {};

  private _onTouched = () => {};

  private _value: string = '';

  public get value() {
    return this._value;
  }

  public set value(value: string | null) {
    this._value = value || '';
    this.onChange(value || '');
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public onHide(): void {
    this.isHide = !this.isHide;
    this.type = this.isHide ? 'password' : 'text';
  }
}
