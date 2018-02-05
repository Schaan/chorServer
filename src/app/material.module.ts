import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatSliderModule
  ]
})
export class MaterialModule {}
