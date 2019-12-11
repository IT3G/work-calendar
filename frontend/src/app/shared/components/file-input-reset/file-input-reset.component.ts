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
  private onChange: Function;
  public file: File;

  @Input()
  fileType: string;

  @Input()
  buttonText: string;

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  writeValue(value: any) {
    this.file = value;
    const nativeFileCtrl: HTMLInputElement = this.host.nativeElement.querySelector('#file-input');
    nativeFileCtrl.value = value;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  public onFileReset() {
    this.onChange(null);
    this.file = null;
  }
}
