import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnowService } from './snow/snow.service';

@NgModule({
  imports: [CommonModule],
  providers: [SnowService],
})
export class WinterSnowModule {}
