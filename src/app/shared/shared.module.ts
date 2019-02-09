import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DatePipe } from 'src/app/shared/pipes/date.pipe';

const exports = [DatePipe];

@NgModule({
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [...exports],
  exports: [...exports, MaterialModule]
})
export class SharedModule {}
