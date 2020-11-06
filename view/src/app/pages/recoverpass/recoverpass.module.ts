import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverpassRoutingModule } from './recoverpass-routing.module';
import { RecoverpassComponent } from './recoverpass.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecoverpassComponent],
  imports: [
    CommonModule,
    RecoverpassRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class RecoverpassModule { }
