import { Component, forwardRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface SelectInputDataModel {
  value: MultiSelectType;
  name: string;
  refersTo?: string;
}

export type MultiSelectType = string | number | boolean;

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true
    }
  ]
})
export class SingleSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input()
  public placeholder: string;

  @Input()
  elements: SelectInputDataModel[];

  public control = new FormControl(null);
  private controlSubscription: Subscription;

  @ViewChild('mySelect', { static: true }) mySelect;

  @HostListener('click')
  click() {
    this.onTouched();
  }

  private onChange = (value: number | string | boolean) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.controlSubscription = this.control.valueChanges.subscribe((element: SelectInputDataModel) =>
      this.onSelectChange(!!element ? element : null)
    );
  }

  ngOnDestroy(): void {
    this.controlSubscription.unsubscribe();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value: number | string | boolean) {
    this.control.setValue(value, { emitEvent: false });
  }

  private onSelectChange(value) {
    this.onTouched();
    this.onChange(value);
  }

  public resetSelect(): void {
    this.control.reset();
    this.mySelect.close();
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.control.disable();
    }
    this.control.enable();
  }
}
