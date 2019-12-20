import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input-reset',
  templateUrl: './file-input-reset.component.html',
  styleUrls: ['./file-input-reset.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputResetComponent),
      multi: true
    }
  ]
})
export class FileInputResetComponent implements ControlValueAccessor {
  public file: File;

  @Input()
  fileType: string;

  @Input()
  buttonText: string;

  private onChange = (value: File | null) => {
  };
  private onTouched = () => {
  };

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  @HostListener('click')
  click() {
    this.onTouched();
  }

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onFileSelect(file);
  }

  writeValue(value: any) {
    this.file = value;
    this.updateNativeInput(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  private onFileSelect(value) {
    this.file = value;
    this.onTouched();
    this.onChange(value);
  }

  public onFileReset() {
    this.onFileSelect(null);
    this.updateNativeInput(null);
  }

  private updateNativeInput(value) {
    const nativeFileCtrl: HTMLInputElement = this.host.nativeElement.querySelector('#file-input');
    nativeFileCtrl.value = value;
  }
}
